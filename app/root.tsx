import { Links, Meta, MetaFunction, Outlet, Scripts } from "@remix-run/react";
import "./styles/globals.css";

export const meta: MetaFunction = () => {
  return [
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
  ];
};

export default function App() {
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased __variable_ac79ff">
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
