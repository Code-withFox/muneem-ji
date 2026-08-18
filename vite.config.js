import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),

        VitePWA({
            registerType: "autoUpdate",

            manifest: {
                name: "Muneem Ji",
                short_name: "Muneem Ji",
                description:
                    "Simple shop management and billing app",

                start_url: "/",
                display: "standalone",

                background_color: "#ffffff",
                theme_color: "#047857",

                orientation: "portrait",

                icons: [
                    {
                        src: "/pwa-192.png",
                        sizes: "192x192",
                        type: "image/png"
                    },
                    {
                        src: "/pwa-512.png",
                        sizes: "512x512",
                        type: "image/png"
                    },
                    {
                        src: "/pwa-512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any maskable"
                    }
                ]
            }
        })
    ]
});