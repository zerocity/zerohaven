import { defineConfig } from "wxt";
import react from "@vitejs/plugin-react";
import pkg from "./package.json";

// See https://wxt.dev/config.html
export default defineConfig({
  manifest: {
    version: pkg.version,
    name: "zerohaven",
    developer: {
      name: "Philipp Bisson",
      url: "https://github.com/zerocity/zerohaven",
    },
    description:
      "Replace new tab page with a personal dashboard. The background can be customized.",
    homepage_url: "https://www.zerocity.sh",
    browser_specific_settings: {
      gecko: {
        id: "zerohaven@zerocity.sh",
      },
    },
    permissions: ["*://wallhaven.cc/*", "*://*", "tabs"],
    icons: {
      "16": "icon/16.png",
      "32": "icon/32.png",
    },
  },
  vite: {
    plugins: [react()],
  },
});
