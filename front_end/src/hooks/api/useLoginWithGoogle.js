import { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useLoginWithGoogle = () => {
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
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
            sessionStorage.setItem("id", id); // 아이디값 세션스토리지에 저장
            navigate("/SignUpEasy", { state: { profile: { id, email } } });
          } else {
            // 이메일이 중복되면 아이디 세션스토리지에 저장후 로그인 완료
            sessionStorage.setItem("id", id);
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
  return { login };
};
export default useLoginWithGoogle;
