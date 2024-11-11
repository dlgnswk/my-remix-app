import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import { handleFileChange } from "~/utils/handleFileChange";

export const FileImportCard = () => {
  return (
    <Card className="w-full text-left">
      <CardHeader>
        <CardTitle>DWG to DXF Converter</CardTitle>
        <CardDescription>
          .dxf 로 변환하고 싶은 .dwg 파일을 불러올 수 있어요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Label htmlFor="dwg">.dwg file</Label>
        <Input id="dwg" type="file" accept=".dwg" onChange={handleFileChange} />
      </CardContent>
    </Card>
  );
};
