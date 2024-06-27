import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/**/*.{js,ts,jsx,tsx,mdx}"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      container: {
        center: true,
      },
    },
  },
  plugins: [
    //...
  ],
};
export default config;
