import type { ActionFunction } from "@remix-run/node";
import {
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

    if (!uploadedFile) {
      return json({ error: "파일 업로드 실패" }, { status: 400 });
    }

    // 파일 이름이 없는 경우 기본값 설정
    const filename = uploadedFile.filename || `file-${Date.now()}.dwg`;

    console.log("Uploaded file details:", {
      filename,
      type: uploadedFile.type,
      size: uploadedFile.size,
    });

    const apiKey = process.env.CLOUDCONVERT_API_KEY;
    if (!apiKey) {
      throw new Error("CLOUDCONVERT_API_KEY is not set");
    }

    const cloudConvert = new CloudConvert(apiKey);

    // Job 설정 개선
    const job = await cloudConvert.jobs.create({
      tasks: {
        "import-my-file": {
          operation: "import/upload",
        },
        "convert-my-file": {
          operation: "convert",
          input: ["import-my-file"],
          output_format: "dxf",
          filename: filename.replace(".dwg", ".dxf"),
        },
        "export-my-file": {
          operation: "export/url",
          input: ["convert-my-file"],
          inline: false,
          archive_multiple_files: false,
        },
      },
    });

    const uploadTask = job.tasks.find((task) => task.name === "import-my-file");
    if (!uploadTask) {
      throw new Error("Upload task not found in job");
    }

    const fileBuffer = await fs.readFile(uploadedFile.filepath);
    const fileStream = Readable.from(fileBuffer);

    await cloudConvert.tasks.upload(
      uploadTask,
      fileStream,
      filename,
      fileBuffer.length
    );

    console.log("Waiting for job completion...");
    const jobResult = await cloudConvert.jobs.wait(job.id);

    console.log("Job Status:", jobResult.status);
    jobResult.tasks.forEach((task) => {
      console.log(`Task ${task.name}:`, {
        status: task.status,
        message: task.message,
        result: task.result,
      });
    });

    if (jobResult.status === "error") {
      throw new Error(
        `Job failed: ${JSON.stringify(
          jobResult.tasks.map((t) => ({
            name: t.name,
            status: t.status,
            message: t.message,
          }))
        )}`
      );
    }

    const exportTask = jobResult.tasks.find(
      (task) => task.operation === "export/url" && task.status === "finished"
    );

    if (!exportTask?.result?.files?.[0]?.url) {
      throw new Error(
        `Export task failed or no URL found: ${JSON.stringify(exportTask)}`
      );
    }

    const fileUrl = exportTask.result.files[0].url;
    const response = await fetch(fileUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to download converted file: ${response.statusText}`
      );
    }

    const dxfContent = await response.text();

    await fs.unlink(uploadedFile.filepath);

    return json({
      success: true,
      dxfContent,
      filename: exportTask.result.files[0].filename,
    });
  } catch (err: unknown) {
    const error = err as Error & {
      response?: {
        data?: {
          message?: string;
          code?: string;
          errors?: unknown;
        };
      };
    };

    console.error("Conversion error:", {
      message: error.message,
      response: error.response?.data,
      stack: error.stack,
      fullError: error,
    });

    return json(
      {
        error: error.message || "Unknown error occurred",
        details: error.response?.data,
      },
      { status: 500 }
    );
  }
};
