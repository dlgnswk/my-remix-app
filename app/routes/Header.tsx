import { json, useLoaderData } from "@remix-run/react";

interface DataProps {
  message: string;
}

export async function loader() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/hello");
    const data: DataProps = await response.json();

    return json(data);
  } catch (error) {
    console.error("Error fetching data:", error);

    return json({ message: "Error fetching data" }, { status: 500 });
  }
}

export default function Index() {
  const data: DataProps = useLoaderData();

  return <h1>{data.message}</h1>;
}
