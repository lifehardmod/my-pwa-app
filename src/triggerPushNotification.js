import { requestPermissionAndGetToken } from "./firebase";

// Vercel Serverless Function에 푸시 알림 요청을 보내는 함수
async function sendPushNotification(token, title, body) {
  try {
    const response = await fetch("/api/sendPush", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, title, body }),
    });

    const data = await response.json();
    console.log("Push notification response:", data);
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
}

// 알림 권한 요청 및 푸시 알림 전송 트리거
export async function triggerPushNotification() {
  const token = await requestPermissionAndGetToken();
  if (token) {
    sendPushNotification(
      token,
      "Hello!",
      "This is a test notification from Vercel serverless function!"
    );
  }
}
