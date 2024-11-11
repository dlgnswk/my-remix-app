import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Settings } from "lucide-react";

export const TextareaWithButton = () => {
  return (
    <div className="flex-1 border-r p-4">
      <Textarea
        className="resize-none min-h-full"
        placeholder="Enter your prompt..."
      />
    </div>
  );
};
