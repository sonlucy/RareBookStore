import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styled/SignUp.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SignUpMail = () => {
  // ========================== backend ==================================//
  const [userData, setUserData] = useState({
    userid: "",
    userpwd: "",
    email: "",
    nickname: "",
    age: "",
    gender: "",
    contact: "",
    grade: "",
    point: "",
  });
  const navigate = useNavigate();

  const submitBtn = async (event) => {
    event.preventDefault(); // Prevent default form submission
    if (
      !userData.userid ||
      !userData.userpwd ||
      !userData.email ||
      !userData.nickname
    ) {
      alert("아이디, 비밀번호, 이메일, 닉네임을 입력해주세요");
      return;
    }
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(userData),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      alert(data);
      if (res.status === 200) {
        navigate("/IDPWLogin");
      } else {
        setUserData({
          userid: "",
          userpwd: "",
          email: "",
          nickname: "",
          age: "",
          gender: "",
          contact: "",
          grade: "",
          point: "",
        });
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <>
      <Header />
      <div className="yhw_container">
        <form className="yhw_signForm">
          <h4>환영합니다! 정보를 입력해주세요.</h4>
          <div className="yhw_signInputBox">
            <span className="yhw_signInputTit">아이디</span>
            <input
              type="text"
              name="userid"
              placeholder="아이디"
              value={userData.userid}
              onChange={handleChange}
            />
            <button className="yhw_dupCheckBtn">중복확인</button>
          </div>
          <div className="yhw_signInputBox">
            <span className="yhw_signInputTit">비밀번호</span>
            <input
              type="password"
              name="userpwd"
              placeholder="비밀번호"
              value={userData.userpwd}
              onChange={handleChange}
            />
          </div>
          <div className="yhw_signInputBox">
            <span className="yhw_signInputTit">비밀번호 확인</span>
            <input
              type="password"
              placeholder="비밀번호 확인"
              required
            />
          </div>
          <div className="yhw_signInputBox">
            <span className="yhw_signInputTit">이메일</span>
            <input
              type="text"
              name="email"
              placeholder="이메일"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div className="yhw_signInputBox">
            <span className="yhw_signInputTit">닉네임</span>
            <input
              type="text"
              placeholder="닉네임"
              value={userData.nickname}
              onChange={handleChange}
            />
            <button className="yhw_dupCheckBtn">중복확인</button>
          </div>
          <div>
            <span className="yhw_signInputTit">나이</span>
            <input
              className="yhw_lastSignInput"
              type="text"
              name="age"
              value={userData.age}
              onChange={handleChange}
            />
            <span>세</span>
          </div>
          <div className="yhw_signInputBox">
            <span className="yhw_signInputTit">성별</span>
              <div className="yhw_signGenderBtns">
                <button>남자</button>
                <button>여자</button>
              </div>
          </div>
          <div className="yhw_signUpBtnBox">
            <button type="submit">회원가입</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default SignUpMail;
