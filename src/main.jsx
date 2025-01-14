import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// React 앱 렌더링
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// 서비스 워커 등록 (커스텀 서비스 워커)
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker 등록 성공:", registration);
    })
    .catch((error) => {
      console.error("Service Worker 등록 실패:", error);
    });
}
