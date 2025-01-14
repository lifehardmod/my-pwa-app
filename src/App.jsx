// src/App.jsx
import React, { useEffect } from "react";
import { requestPermissionAndGetToken } from "./firebase";

function App() {
  useEffect(() => {
    // 페이지 로드 시점에 알림 권한 요청 및 FCM 토큰 획득
    requestPermissionAndGetToken();
  }, []);

  return (
    <div>
      <h1>My PWA with Firebase Push</h1>
      <p>
        알림 권한을 허용하면, 백그라운드 및 포그라운드에서 푸시 알림을 수신할 수
        있습니다.
      </p>
    </div>
  );
}

export default App;
