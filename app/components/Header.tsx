import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { Terminal } from "lucide-react";

interface HeaderProps {
  message: string;
}

export default function Header({ message }: HeaderProps) {
  return (
    <Alert className="w-[380px] text-left m-auto mb-5">
      <Terminal className="h-4 w-4" />
      <AlertTitle>잠시만요!</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
