import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },

  daisyui: {
    themes: [
      "synthwave",
      "fantasy",
      {
        customdark: {
          primary: "#1d4ed8",
          secondary: "#c084fc",
          accent: "#fda4af",
          neutral: "#2a2b30",
          "base-100": "#282030",
          info: "#00c1db",
          success: "#00ea73",
          warning: "#fbbf24",
          error: "#da3554",
        },
      },
    ],
    darkTheme: "synthwave",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: "true",
    themeRoot: ":root",
  },

  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
export default config;
