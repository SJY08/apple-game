import { defineConfig } from "vite"

// https://vitejs.dev/config
export default defineConfig(async () => {
    const { default: tailwindcss } = await import("@tailwindcss/vite")
    return {
        plugins: [tailwindcss()],
    }
})
