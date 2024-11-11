import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import { AlertCard } from "~/components/AlertCard";

interface LoaderData {
  data: string;
}

export async function loader() {
  return json<LoaderData>(
    { data: "api 요청입니다." },
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    }
  );
}

export default function Layout() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div className="w-[380px] flex flex-col justify-center gap-5 text-center m-auto mt-10">
      <AlertCard message={data} />
      <Outlet />
    </div>
  );
}
