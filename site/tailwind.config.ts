import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'black': '#212529',
        'gray': '#6C757D',
        'green': '#81B29A',
        'orange': '#E26D5C'
      }
    },
  },
  plugins: [],
};
export default config;
