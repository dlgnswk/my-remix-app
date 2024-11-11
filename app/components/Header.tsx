import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { Terminal } from "lucide-react";

interface HeaderProps {
  message: string;
}

export const Header = ({ message }: HeaderProps) => {
  return (
    <Alert className="w-full text-left">
      <Terminal className="h-4 w-4" />
      <AlertTitle>DWG to DXF CONVERT TEST</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};
