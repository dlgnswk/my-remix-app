import { useLoaderData } from "@remix-run/react";
import { useQuery } from "@tanstack/react-query";

interface DataProps {
  message: string;
}

export default function Index() {
  const initialData = useLoaderData<DataProps>();

  const { data } = useQuery({
    queryKey: ["hello"],
    queryFn: async () => {
      const response = await fetch("http://127.0.0.1:8000/api/hello");
      return response.json();
    },
    initialData: initialData,
  });

  return <h1>{data.message}</h1>;
}
