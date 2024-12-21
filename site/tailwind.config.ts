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
        'accent': 'hsl(210, 11%, 15%)',
        'black': 'hsl(210, 11%, 15%)',
        'dark-gray': 'hsl(210, 11%, 40%)',
        'gray': 'hsl(210, 11%, 60%)',
        'light-gray': 'hsl(210, 11%, 95%)',
        'light': 'hsl(230, 7%, 99%)',
        'green': '#81B29A',
        'orange': '#E26D5C',
        'yellow': '#F2CD5C',
        'blue': '#5C88C4'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
