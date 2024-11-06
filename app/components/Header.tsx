interface HeaderProps {
  message: string;
}

export default function Header({ message }: HeaderProps) {
  return <h1>{message}</h1>;
}
