// Firebase 모듈 불러오기
import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

// 환경 변수 가져오기 (빌드 시점에 import.meta.env로 치환됨)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// 백그라운드 메시지 수신
onBackgroundMessage(messaging, (payload) => {
  console.log("[firebase-messaging-sw.js] 백그라운드 메시지 수신:", payload);
  const { title, body } = payload.notification;

  self.registration.showNotification(title, {
    body,
    icon: "/icon-192.png",
  });
});
