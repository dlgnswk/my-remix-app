import { ChangeEvent } from "react";
import DxfParser from "dxf-parser";
import { convertStarToSvg } from "./convertDxfToSvg";

export const parseDwgToDxfToApi = async (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/convert", {
      method: "POST",
      body: formData,
    });

    console.log(response);

    if (!response.ok) {
      throw new Error("Failed to convert file");
    }

    const responseClone = response.clone();
    const blob = await responseClone.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = file.name.replace(".dwg", ".dxf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);

    const { dxfContent, error } = await response.json();

    if (error) {
      throw new Error(error);
    }

    const parser = new DxfParser();

    try {
      const dxfObject = parser.parseSync(dxfContent);
      console.log("파싱된 dxf:", dxfObject);

      if (!dxfObject) throw new Error("dxf 데이터가 없음");

      const svgContent = convertStarToSvg(dxfObject);
      console.log(svgContent);
      return dxfObject;
    } catch (parseError) {
      console.error("dxf 파싱 오류", parseError);
      throw parseError;
    }
  } catch (error) {
    console.error("에러: ", error);
    alert(error instanceof Error ? error.message : "파일 변환 중 오류 발생");
    throw error;
  }
};
