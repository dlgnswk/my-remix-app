import { ChangeEvent } from "react";
import CloudConvert from "cloudconvert";
import DxfParser from "dxf-parser";
import { Task } from "cloudconvert/built/lib/TasksResource";

interface FileResult {
  filename: string;
  url: string;
  size?: number;
}

interface UploadTask extends Task {
  name: string;
  operation: "import/upload";
}

interface ExportTask extends Task {
  name: string;
  operation: "export/url";
  result?: {
    files?: FileResult[];
  };
}

export const parseDwgToDxfToApi = async (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const cloudconvert = new CloudConvert(
    import.meta.env.VITE_CLOUDCONVERT_API_KEY
  );

  try {
    const job = await cloudconvert.jobs.create({
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

    if (!job.tasks) {
      throw new Error("No tasks found in job");
    }

    const uploadFile = job.tasks.find(
      (task): task is UploadTask => task.name === "import-file"
    );

    if (!uploadFile) {
      throw new Error("Upload task not found");
    }

    // FormData를 사용하여 파일 업로드
    const formData = new FormData();
    formData.append("file", file);

    await fetch(uploadFile.result?.form.url, {
      method: "POST",
      body: formData,
    });

    const result = await cloudconvert.jobs.wait(job.id);

    const exportFile = result.tasks.find(
      (task): task is ExportTask => task.operation === "export/url"
    );

    if (!exportFile?.result?.files?.[0]?.url) {
      throw new Error("Export URL not found");
    }

    const fileUrl = exportFile.result.files[0].url;
    const response = await fetch(fileUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch DXF file: ${response.statusText}`);
    }

    const dxfContent = await response.text();
    const parser = new DxfParser();

    try {
      const dxfObject = parser.parseSync(dxfContent);
      console.log("파싱된 dxf:", dxfObject);

      if (!dxfObject) throw new Error("dxf 데이터가 없음");

      const layers = dxfObject.tables.layer.layers;
      console.log("레이어: ", Object.keys(layers));
      return dxfObject;
    } catch (parseError) {
      console.error("dxf 파싱 오류", parseError);
    }
  } catch (error) {
    console.error("에러: ", error);
    alert(error instanceof Error ? error.message : "파일 변환 중 오류 발생");
    throw error;
  }
};
