import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import { serverURL } from "../config";
export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUser, setLoginUser] = useState();

  // 로그인 및 로그아웃 이벤트 발생 시에도 세션 체크
  const checkSession = async () => {
    try {
      const response = await fetch("/api/checkSession", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data, 'data');
        setIsLoggedIn(data.loggedIn);
        setLoginUser(data.loginUser);
      } else {
        console.error("세션 상태 확인 실패:", response.statusText);
        const userId = sessionStorage.getItem("id"); // userId 가져오기
        const isLoggedIn = userId !== null; // 로그인 상태 확인
        setIsLoggedIn(isLoggedIn); // 로그인 상태 설정
        const userInfo = await fetchUserInfo(userId); // 사용자 정보 가져오기
        setLoginUser(userInfo); // 사용자 정보 설정
      }
    } catch (error) {
      console.error("세션 상태 확인 및 사용자 정보 설정 실패:", error);
    }
  };

  useEffect(() => {
    checkSession();
  }, []); // 컴포넌트가 마운트될 때 한 번만 세션 체크

const fetchUserInfo = async (userId) => {
  try {
    // userId를 이용하여 사용자 정보를 가져옵니다.
    console.log(userId, "유저아이디");
    const response = await axios.get(`${serverURL}/customers/userInfo/${userId}`);
    console.log("유저custKey", response.data.custKey);
    return response.data.custKey; // 사용자 정보를 반환
  } catch (error) {
    console.error("사용자 정보를 가져오는 중 오류 발생fetchUserInfo:", error); 
    return null;
  }
};


  // 로그인된 사용자 정보를 가져오고 설정하는 함수
  const setLoggedInUser = async () => {
    const userId = sessionStorage.getItem("id"); // userId 가져오기
    if (userId) { // userId가 존재할 때만 사용자 정보를 가져옴
      try {
        const userInfo = await fetchUserInfo(userId);
        if (userInfo) {
          setLoginUser(userInfo);
        } else {
          console.error("사용자 정보를 설정하는 중 오류 발생:");
        }
      } catch (error) {
        console.error("사용자 정보를 설정하는 중 오류 발생setLoggedInUser:", error);
      }
    }
  };

  // 컴포넌트가 마운트될 때 한 번만 로그인된 사용자 정보를 가져오고 설정
  useEffect(() => {
    setLoggedInUser();
  }, []);

  return (
    <LoginContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, loginUser, setLoginUser }}
    >
      {children}
    </LoginContext.Provider>
  );
};
