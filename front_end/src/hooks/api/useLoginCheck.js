import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useLoginCheck = () => {
  const [userData, setUserData] = useState({
    userid: "",
    userpwd: "",
  });
  const navigate = useNavigate();
  const loginCheck = async () => {
    try {
      const res = await fetch("/api/loginCheck", {
        method: "POST",
        body: JSON.stringify(userData),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (res.status === 200) {
        alert("로그인 완료");
        navigate("/");
        window.location.reload(); // 페이지 리로드
      } else {
        alert("아이디 및 비밀번호를 확인해주세요");
        setUserData({ userid: "", userpwd: "" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { userData, setUserData, loginCheck };
};

export default useLoginCheck;
