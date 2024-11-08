import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [remix()],
  resolve: {
    alias: {
      "~": resolve(__dirname, "./app"),
    },
  },
  define: {
    "process.env.CLOUDCONVERT_API_KEY": JSON.stringify(
      process.env.CLOUDCONVERT_API_KEY
    ),
  },
});
