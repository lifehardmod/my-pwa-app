import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// .env에 설정된 Firebase 키 정보 가져오기
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// FCM 초기화
const messaging = getMessaging(app);

// 현재 브라우저가 알림을 지원하는지 체크
export const requestPermissionAndGetToken = async () => {
  try {
    // 알림 권한 요청
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // 권한이 승인되면 FCM 토큰 획득
      const currentToken = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY, // .env에서 가져온 VAPID 키
      });
      if (currentToken) {
        console.log("FCM Token:", currentToken);
        return currentToken;
      } else {
        console.log("FCM 토큰을 가져올 수 없습니다.");
      }
    } else {
      console.log("알림 권한이 거부되었습니다.");
    }
  } catch (error) {
    console.error("알림 권한 요청 또는 FCM 토큰 획득 실패:", error);
  }
};

// 포그라운드 메시지 처리
onMessage(messaging, (payload) => {
  console.log("포그라운드 푸시 알림 수신:", payload);
  // 필요 시, 웹 페이지에서 알림 UI를 추가 처리할 수 있습니다.
});
