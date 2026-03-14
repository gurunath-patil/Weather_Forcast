import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
    alias: {
      // This tells Vite: when you see "@", look in the "src" folder
      "@": path.resolve(__dirname, "./src"),
    },
  }
})
