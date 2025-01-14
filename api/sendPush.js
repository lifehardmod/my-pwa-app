import admin from "firebase-admin";

// Firebase Admin 초기화 (환경 변수로부터 서비스 계정 키 정보 가져오기)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: "service_account",
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { token, title, body } = req.body;

  if (!token || !title || !body) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const message = {
    notification: {
      title,
      body,
    },
    token,
  };

  try {
    const response = await admin.messaging().send(message);
    return res
      .status(200)
      .json({ message: "Push notification sent!", response });
  } catch (error) {
    console.error("Error sending push notification:", error);
    return res.status(500).json({ error: "Failed to send push notification" });
  }
}
