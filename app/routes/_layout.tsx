import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import Header from "~/components/Header";

interface HelloData {
  message: string;
}

export async function loader() {
  const helloResponse = await fetch("http://127.0.0.1:8000/api/hello");
  const helloData = await helloResponse.json();

  return json<HelloData>({ message: helloData.message });
}

export default function Layout() {
  const { message } = useLoaderData<typeof loader>();

  return (
    <div className="w-full text-center">
      <Header message={message} />
      <Outlet />
    </div>
  );
}
