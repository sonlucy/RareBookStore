// LoginContext.js

import React, { createContext, useState, useEffect } from 'react';

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 및 로그아웃 이벤트 발생 시에도 세션 체크
  const checkSession = async () => {
    try {
      const response = await fetch("/api/checkSession", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(data.loggedIn);
      } else {
        console.error("세션 상태 확인 실패:", response.statusText);
        setIsLoggedIn(checkGoogleLoginStatus());
      }
    } catch (error) {
      console.error("세션 상태 확인 실패:", error.message);
      setIsLoggedIn(checkGoogleLoginStatus());
    }
  };

  useEffect(() => {
    checkSession();
    
  }, [isLoggedIn]); // isLoggedIn 상태가 변경될 때마다 세션 체크

  const checkGoogleLoginStatus = () => {
    const userId = sessionStorage.getItem('id');
    return userId !== null;
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};
