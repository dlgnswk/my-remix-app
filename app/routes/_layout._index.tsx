import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

interface ByeData {
  message: string;
}

export async function loader() {
  const byeResponse = await fetch("http://127.0.0.1:8000/api/bye");
  const byeData = await byeResponse.json();

  return json<ByeData>({ message: byeData.message });
}

export default function Index() {
  const { message } = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="dwg">.dwg file</Label>
        <Input id="dwg" type="file" />
      </div>
      <Button>{message}</Button>
    </div>
  );
}
