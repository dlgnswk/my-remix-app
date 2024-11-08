import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import Header from "~/components/Header";

interface LoaderData {
  data: string;
}

export async function loader() {
  return json<LoaderData>({ data: "api 요청입니다." });
}

export default function Layout() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div className="w-full text-center my-10">
      <Header message={data} />
      <Outlet />
    </div>
  );
}
