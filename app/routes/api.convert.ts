import {
  ActionFunction,
  json,
  unstable_createFileUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";

import CloudConvert from "cloudconvert";

import { Readable } from "stream";
import { promises as fs } from "fs";

export const action: ActionFunction = async ({ request }) => {
  try {
    const uploadHandler = unstable_createFileUploadHandler({
      maxPartSize: 50_000_000,
      file: ({ filename }) => filename,
    });

    const formData = await unstable_parseMultipartFormData(
      request,
      uploadHandler
    );

    const uploadedFile = formData.get("file") as any;

    if (!uploadedFile)
      return json({ error: "파일 업로드 실패" }, { status: 400 });

    const cloudConvert = new CloudConvert(
      import.meta.env.VITE_CLOUDCONVERT_API_KEY
    );

    const job = await cloudConvert.jobs.create({
      tasks: {
        "import-file": {
          operation: "import/upload",
        },
        "convert-file": {
          operation: "convert",
          input: ["import-file"],
          input_format: "dwg",
          output_format: "dxf",
          engine: "autocad",
        },
        "export-file": {
          operation: "export/url",
          input: ["convert-file"],
        },
      },
    });

    if (!job.tasks) throw new Error("No tasks found in job");
    const uploadTask = job.tasks.find((task) => task.name === "import-file");

    if (!uploadTask) throw new Error("Upload task not found");

    const fileBuffer = await fs.readFile(uploadedFile.filepath);
    const fileStream = new Readable();
    fileStream.push(fileBuffer);
    fileStream.push(null);

    // 스트림으로 업로드
    await cloudConvert.tasks.upload(uploadTask, fileStream);

    // 임시 파일 정리
    await fs.unlink(uploadedFile.filepath);

    const result = await cloudConvert.jobs.wait(job.id);

    const exportTask = result.tasks.find(
      (task) => task.operation === "export/url"
    );
    if (!exportTask?.result?.files?.[0]?.url) {
      throw new Error("Export URL not found");
    }

    const fileUrl = exportTask.result.files[0].url;
    const response = await fetch(fileUrl);
    const dxfContent = await response.text();

    return json({ dxfContent });
  } catch (error) {
    console.error("Conversion error:", error);
    return json(
      {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
};
