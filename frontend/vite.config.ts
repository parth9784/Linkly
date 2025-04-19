import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// @ts-ignore
import daisyui from "daisyui";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), daisyui],
});
