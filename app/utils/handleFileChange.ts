import { ChangeEvent } from "react";
import { parseDwg } from "./parseDwg";
import { parseDwgToDxfToApi } from "./parseDwgToDxfToApi";
import { parseDwgToDxfToLib } from "./parseDwgToDxfToLib";

// export const handleFileChange = parseDwgToDxfToLib;
// export const handleFileChange = parseDwgToDxfToApi;
// export const handleFileChange = parseDwg;
export const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.files?.[0]);
};
