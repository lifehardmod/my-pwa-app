import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

function replaceEnvVariables() {
  return {
    name: "replace-env-variables",
    transform(code, id) {
      if (id.endsWith("firebase-messaging-sw.js")) {
        return code
          .replace("__VITE_FIREBASE_API_KEY__", JSON.stringify(process.env.VITE_FIREBASE_API_KEY))
          .replace("__VITE_FIREBASE_AUTH_DOMAIN__", JSON.stringify(process.env.VITE_FIREBASE_AUTH_DOMAIN))
          .replace("__VITE_FIREBASE_PROJECT_ID__", JSON.stringify(process.env.VITE_FIREBASE_PROJECT_ID))
          .replace("__VITE_FIREBASE_STORAGE_BUCKET__", JSON.stringify(process.env.VITE_FIREBASE_STORAGE_BUCKET))
          .replace("__VITE_FIREBASE_MESSAGING_SENDER_ID__", JSON.stringify(process.env.VITE_FIREBASE_MESSAGING_SENDER_ID))
          .replace("__VITE_FIREBASE_APP_ID__", JSON.stringify(process.env.VITE_FIREBASE_APP_ID));
      }
      return code;
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: false,
      manifest: {
        name: "My PWA App",
        short_name: "MyPWA",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
    replaceEnvVariables(), // 환경 변수 치환 플러그인 추가
  ],
});
