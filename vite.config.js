import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    remix({
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route("/", "routes/Home.tsx");
        });
      },
    }),
  ],
  resolve: {
    alias: {
      "~": resolve(__dirname, "./app"),
    },
  },
});
