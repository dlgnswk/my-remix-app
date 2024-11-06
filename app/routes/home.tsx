import { json, useLoaderData } from "@remix-run/react";

import Header from "./Header";
import { Button } from "~/components/ui/button";

interface DataProps {
  message: string;
}

export async function loader() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/bye");
    const data: DataProps = await response.json();

    return json(data);
  } catch (error) {
    console.error("Error fetching data:", error);

    return json({ message: "Error fetching data" }, { status: 500 });
  }
}

export default function Home() {
  const data: DataProps = useLoaderData();

  return (
    <div>
      <Header />
      <span>{data.message}</span>
      <Button>Click</Button>
    </div>
  );
}
