import { ChangeEvent } from "react";
import DxfParser from "dxf-parser";

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

    const { dxfContent, error } = await response.json();

    if (error) {
      throw new Error(error);
    }

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
      throw parseError;
    }
  } catch (error) {
    console.error("에러: ", error);
    alert(error instanceof Error ? error.message : "파일 변환 중 오류 발생");
    throw error;
  }
};
