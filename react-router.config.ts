import type { Config } from "@react-router/dev/config";

export default {
  // Static SPA: no server runtime, deployed to GitHub Pages.
  ssr: false,

  /** Custom Config */
  appDirectory: "./src/app",
} satisfies Config;
