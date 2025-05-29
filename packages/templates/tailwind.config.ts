import type { Config } from 'tailwindcss';

export default {
  content: ["./src/**/*.{ts,tsx}", "../../apps/docs/src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config

