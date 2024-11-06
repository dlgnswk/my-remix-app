import { ChangeEvent } from "react";
import DxfParser from "dxf-parser";

export const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("http://127.0.0.1:8000/api/dwg2dxf", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ detail: "알 수 없는 오류가 발생했습니다." }));
      throw new Error(errorData.detail || "변환 중 오류가 발생했습니다.");
    }

    const dxfContent = await response.text();

    console.log(
      "Raw DXF content first 1000 chars:",
      dxfContent.substring(0, 1000)
    );
    console.log("DXF content length:", dxfContent.length);

    if (!dxfContent.trim().startsWith("0\nSECTION")) {
      console.error("Invalid DXF format - doesn't start with SECTION");
      return;
    }

    const parser = new DxfParser();
    try {
      const dxf = parser.parseSync(dxfContent);
      console.log("Parsed DXF:", dxf);

      if (!dxf) {
        throw new Error("dxf 데이터가 없습니다.");
      }

      const layers = dxf.tables.layer.layers;
      console.log("Layers:", Object.keys(layers));
    } catch (parseError: any) {
      console.error("DXF 파싱 오류:", parseError);
      console.error("Error message:", parseError.message);

      const errorPos = parseError.message.match(/Ended on code (.*)/)?.[1];
      if (errorPos) {
        const startPos = Math.max(0, dxfContent.indexOf(errorPos) - 100);
        console.log(
          "Context around error:",
          dxfContent.substring(startPos, startPos + 200)
        );
      }
    }
  } catch (error) {
    console.error("Error details:", error);
    alert(
      error instanceof Error
        ? error.message
        : "파일 변환 중 오류가 발생했습니다."
    );
  }
};
