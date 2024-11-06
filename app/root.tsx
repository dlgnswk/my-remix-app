import { Links, Meta, Outlet, Scripts } from "@remix-run/react";
import "./styles/globals.css";

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
