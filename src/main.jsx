import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// 서비스 워커 등록 (ES 모듈 방식)
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js", { type: "module" }) // type: "module" 옵션 추가
    .then((registration) => {
      console.log("Service Worker 등록 성공:", registration);
    })
    .catch((error) => {
      console.error("Service Worker 등록 실패:", error);
    });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
