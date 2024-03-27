import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useGoogleLogin } from "@react-oauth/google";
import useLogOut from "../hooks/api/useLogOut";
const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 800px;
`;

const SNSLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 650px;
  height: 450px;
  margin-bottom: 200px;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 385px;
  height: 176px;
  margin: 0;
`;

const LogoImage = styled.div`
  width: 165px;
  height: 42px;
  background-image: url("/Logo.png");
  margin: 50px;
`;

const KakaoLogoImage = styled.div`
  width: 21px;
  height: 21px;
  background-image: url("/Kakao.png");
  background-size: contain;
  background-repeat: no-repeat;
`;

const GoogleLogoImage = styled.div`
  width: 21px;
  height: 21px;
  background-image: url("/Google.png");
  background-size: contain;
  background-repeat: no-repeat;
`;

const KakaoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 384px;
  height: 52px;
  background-color: #ffde00;
  border-radius: 10px;
`;

const GoogleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 384px;
  height: 52px;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 10px;
`;

const IdContainer = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 384px;
  height: 52px;
  background-color: #f2f8ff;
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: underline;
  }
`;

function SNSLogin(props) {
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
  const { logout } = useLogOut(); // Use the custom hook
  let navigate = useNavigate();

  //구글 로그인
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then(async (res) => {
          const { id, email } = res.data;
          console.log(id, email);
          // 이메일 중복 확인
          const { isDuplicate, data, error } = await checkEmailDuplicate(email);

          if (!isDuplicate) {
            // 이메일이 중복되지 않으면 프로필 설정 및 페이지 이동
            setProfile({ id, email });
            sessionStorage.setItem("userEmail", email);
            navigate("/SignUpEasy", { state: { profile: { id, email } } });
          } else {
            // 이메일이 중복되면 이메일 세션에 저장후 로그인 완료
            sessionStorage.setItem("userEmail", email);
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user, navigate]);

  // 이메일 중복체크
  const checkEmailDuplicate = async (email) => {
    try {
      const response = await fetch("/api/checkEmailDuplicate", {
        method: "POST",
        body: JSON.stringify({ email }), // Send email in the request body
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      return response.status === 200
        ? { isDuplicate: false, data }
        : { isDuplicate: true, error: data };
    } catch (error) {
      // 네트워크 오류 등 예외 발생 시 false와 에러 반환
      return { isDuplicate: false, error };
    }
  };

  // const login = useGoogleLogin({
  //   onSuccess: (codeResponse) => {
  //     setUser(codeResponse);
  //     console.log("로그인성공");
  //   },
  //   onError: (error) => console.log("Login Failed:", error),
  // });

  // useEffect(() => {
  //   if (user) {
  //     axios
  //       .get(
  //         `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${user.access_token}`,
  //             Accept: "application/json",
  //           },
  //         }
  //       )
  //       .then(async (res) => {
  //         const { id, email } = res.data;
  //         console.log(id, email);
  //         // 이메일 중복 확인
  //         await checkEmailDuplicate(email);
  //         // const { isDuplicate, data, error } = await checkEmailDuplicate(email);

  //         if (!isDuplicate) {
  //           // 이메일이 중복되지 않으면 프로필 설정 및 페이지 이동
  //           setProfile({ id, email });
  //           sessionStorage.setItem("userEmail", email);
  //           navigate("/SignUpEasy", { state: { profile: { id, email } } });
  //         } else {
  //           // 이메일이 중복되면 이메일 세션에 저장후 로그인 완료
  //           // console.error("Email already exists:", error || data);
  //           sessionStorage.setItem("userEmail", email);
  //           navigate("/");
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [user, navigate]);

  //이메일 중복체크

  // const checkEmailDuplicate = async (email) => {
  //   try {
  //     const response = await fetch("/api/checkEmailDuplicate", {
  //       method: "POST",
  //       body: JSON.stringify({ email }), // Send email in the request body
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data = await response.json();

  //     if (response.status === 200) {
  //       // 이메일이 중복되지 않으면 true 반환
  //       return { isDuplicate: false, data };
  //     } else {
  //       // 이메일이 중복되면 false와 오류 데이터 반환
  //       return { isDuplicate: true, error: data };
  //     }
  //   } catch (error) {
  //     // 네트워크 오류 등 예외 발생 시 false와 에러 반환
  //     return { isDuplicate: false, error };
  //   }
  // };

  // Handle logout when the logout button is clicked
  // const handleLogout = async () => {
  //   await logout(); // 커스텀 훅
  //   // Additional logic after logout if needed
  //   navigate("/"); // Redirect to home page after logout
  // };

  return (
    <div>
      <Header />
      <CenteredContainer>
        <SNSLoginContainer>
          <LogoImage></LogoImage>
          <LoginContainer>
            <KakaoContainer>
              <KakaoLogoImage />
              <span>카카오로 시작하기</span>
            </KakaoContainer>
            <GoogleContainer onClick={login}>
              <GoogleLogoImage />
              <span>구글로 시작하기</span>
            </GoogleContainer>
            <GoogleContainer onClick={logout}>
              <GoogleLogoImage />
              <span>로그아웃</span>
            </GoogleContainer>
            <IdContainer to="/IDPWLogin">
              <span>아이디/비밀번호</span>
            </IdContainer>
          </LoginContainer>
        </SNSLoginContainer>
      </CenteredContainer>
      <Footer />
    </div>
  );
}

export default SNSLogin;

// import styled from "styled-components";
// import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// const CenteredContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 800px;
// `;

// const SNSLoginContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 650px;
//   height: 450px;
//   margin-bottom: 200px;
// `;

// const LoginContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   align-items: center;
//   width: 385px;
//   height: 176px;
//   margin: 0;
// `;

// const LogoImage = styled.div`
//   width: 165px;
//   height: 42px;
//   background-image: url("/Logo.png");
//   margin: 50px;
// `;

// const KakaoLogoImage = styled.div`
//   width: 21px;
//   height: 21px;
//   background-image: url("/Kakao.png");
//   background-size: contain;
//   background-repeat: no-repeat;
// `;

// const GoogleLogoImage = styled.div`
//   width: 21px;
//   height: 21px;
//   background-image: url("/Google.png");
//   background-size: contain;
//   background-repeat: no-repeat;
// `;

// const KakaoContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 384px;
//   height: 52px;
//   background-color: #ffde00;
//   border-radius: 10px;
// `;

// const GoogleContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 384px;
//   height: 52px;
//   background-color: #ffffff;
//   border: 1px solid rgba(0, 0, 0, 0.16);
//   border-radius: 10px;
// `;

// const IdContainer = styled(NavLink)`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 384px;
//   height: 52px;
//   background-color: #f2f8ff;
//   border-radius: 10px;
//   text-decoration: none;
//   color: inherit;
// `;

// function SNSLogin(props) {
//   return (
//     <div>
//       <Header />
//       <CenteredContainer>
//         <SNSLoginContainer>
//           <LogoImage></LogoImage>
//           <LoginContainer>
//             <KakaoContainer>
//               <KakaoLogoImage />
//               <span>카카오로 시작하기</span>
//             </KakaoContainer>
//             <GoogleContainer>
//               <GoogleLogoImage />
//               <span>구글로 시작하기</span>
//             </GoogleContainer>
//             <IdContainer to="/IDPWLogin">
//               <span>아이디/비밀번호</span>
//             </IdContainer>
//           </LoginContainer>
//         </SNSLoginContainer>
//       </CenteredContainer>
//       <Footer />
//     </div>
//   );
// }

// export default SNSLogin;
