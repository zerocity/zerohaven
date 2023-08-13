import { defineConfig } from "wxt";
import react from "@vitejs/plugin-react";
import pkg from "./package.json";

// See https://wxt.dev/config.html
export default defineConfig({
  manifest: {
    version: pkg.version,
    name: "zerohaven",
    applications: {
      gecko: {
        id: "zerohaven@zerocity.sh",
      },
    },
    permissions: ["*://wallhaven.cc/*", "tabs"],
    icons: {
      "16": "icon/16.png",
      "32": "icon/32.png",
    },
  },
  vite: {
    plugins: [react()],
  },
});
