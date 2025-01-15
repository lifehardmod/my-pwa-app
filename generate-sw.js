import fs from "fs";
import path from "path";

// __dirname 대체 (ES 모듈에서는 __dirname이 정의되지 않으므로 아래와 같이 설정)
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Vercel 환경 변수로부터 Firebase 설정 값 가져오기
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

// 서비스 워커 파일 내용 생성
const swContent = `
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
  import { getMessaging, onBackgroundMessage } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-messaging-sw.js";

  const firebaseConfig = ${JSON.stringify(firebaseConfig)};

  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);

  onBackgroundMessage(messaging, (payload) => {
    console.log("[firebase-messaging-sw.js] 백그라운드 메시지 수신:", payload);
    const { title, body } = payload.notification;

    self.registration.showNotification(title, {
      body,
      icon: "/icon-192.png",
    });
  });
`;

// 파일 저장 경로
const outputPath = path.join(__dirname, "public", "firebase-messaging-sw.js");

// 파일 쓰기
fs.writeFileSync(outputPath, swContent, "utf8");
console.log("firebase-messaging-sw.js 파일이 생성되었습니다.");
