import { json, useLoaderData } from "@remix-run/react";
import { Button } from "../components/ui/button";

interface dataProps {
  message: string;
}

export async function loader() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/bye");
    const data: dataProps = await response.json();

    return json(data);
  } catch (error) {
    console.error("Error fetching data:", error);

    return json({ message: "Error fetching data" }, { status: 500 });
  }
}

export default function Home() {
  const data: dataProps = useLoaderData();

  return (
    <div>
      <span>{data.message}</span>
      <Button>Click</Button>
    </div>
  );
}
