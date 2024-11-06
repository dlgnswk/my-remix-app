import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { Terminal } from "lucide-react";

interface HeaderProps {
  message: string;
}

export default function Header({ message }: HeaderProps) {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>잠시만요!</AlertTitle>
      <AlertDescription>테스트 단계입니다.</AlertDescription>
    </Alert>
  );
}
