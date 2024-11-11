import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  return null;
};

export default function Write() {
  return <div>write page</div>;
}
