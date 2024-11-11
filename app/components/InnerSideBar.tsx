import { Button } from "~/components/ui/button";
import { AlignLeft, Download, Settings } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { TextCard } from "./TextCard";

export const InnerSideBar = () => {
  return (
    <div className="w-[400px] p-4 flex flex-col gap-6">
      <div>
        <h3 className="mb-2 text-sm font-medium">Layout</h3>
        <Select defaultValue="HTML">
          <SelectTrigger>
            <SelectValue placeholder="Select Layout" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="HTML">HTML</SelectItem>
            <SelectItem value="Query">Query</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Setting</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <TextCard />
    </div>
  );
};
