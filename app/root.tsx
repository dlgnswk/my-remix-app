import { Links, Meta, Outlet, Scripts, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

import "./styles/globals.css";

interface dataProps {
  message: string;
}

export async function loader() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/hello");
    const data: dataProps = await response.json();

    return json(data);
  } catch (error) {
    console.error("Error fetching data:", error);

    return json({ message: "Error fetching data" }, { status: 500 });
  }
}

export default function App() {
  const data: dataProps = useLoaderData();

  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <h1>{data.message}</h1>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
