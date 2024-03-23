import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styled/SignUp.css";
<<<<<<< HEAD
// import Header from "./Header";
// import Footer from "./Footer";

const SignUpMail = () => {

  return (
    <>
      {/* <Header /> */}
      
=======
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
>>>>>>> 653a7cd12dcc891b2bd7fbca801f3a95682d62ef
      <div className="yhw_container">
        <form className="yhw_signForm">
          <h4>환영합니다! 정보를 입력해주세요.</h4>
          <div className="yhw_signInputBox">
<<<<<<< HEAD
            <span className="yhw_signInputTit">이메일</span>
            <input
              // value={userEmail}
              // onChange={(e) => setUserEmail(e.target.value)}
              type="email"
              placeholder="이메일 입력"
              required
            />
          </div>
          <div className="yhw_signInputBox">
=======
>>>>>>> 653a7cd12dcc891b2bd7fbca801f3a95682d62ef
            <span className="yhw_signInputTit">아이디</span>
            <input
              // value={userEmail}
              // onChange={(e) => setUserEmail(e.target.value)}
              type="text"
<<<<<<< HEAD
              placeholder="아이디 입력"
              required
              />
              <button className="yhw_dupCheckBtn">중복확인</button>
=======
              name="userid"
              placeholder="아이디"
              value={userData.userid}
              onChange={handleChange}
            />
            <button className="yhw_dupCheckBtn">중복확인</button>
>>>>>>> 653a7cd12dcc891b2bd7fbca801f3a95682d62ef
          </div>
          <div className="yhw_signInputBox">
            <span className="yhw_signInputTit">비밀번호</span>
            <input
              // value={userPassword}
              // onChange={(e) => setUserPassword(e.target.value)}
              type="password"
<<<<<<< HEAD
              placeholder="비밀번호"
              required
=======
              name="userpwd"
              placeholder="비밀번호"
              value={userData.userpwd}
              onChange={handleChange}
>>>>>>> 653a7cd12dcc891b2bd7fbca801f3a95682d62ef
            />
          </div>
          <div className="yhw_signInputBox">
            <span className="yhw_signInputTit">비밀번호 확인</span>
            <input
              // value={checkPassword}
              // onChange={(e) => setCheckPassword(e.target.value)}
              type="password"
              placeholder="비밀번호 확인"
              required
<<<<<<< HEAD
              />
=======
            />
          </div>
          <div className="yhw_signInputBox">
            <span className="yhw_signInputTit">이메일</span>
            <input
              // value={userEmail}
              // onChange={(e) => setUserEmail(e.target.value)}
              type="text"
              name="email"
              placeholder="이메일"
              value={userData.email}
              onChange={handleChange}
            />
>>>>>>> 653a7cd12dcc891b2bd7fbca801f3a95682d62ef
          </div>
          <div className="yhw_signInputBox">
            <span className="yhw_signInputTit">닉네임</span>
            <input
              // value={userNumber}
              // onChange={(e) => setUserNumber(e.target.value)}
              type="text"
<<<<<<< HEAD
              placeholder="전화번호"
              required
              />
              <button className="yhw_dupCheckBtn">중복확인</button>
=======
              name="nickname"
              placeholder="닉네임"
              value={userData.nickname}
              onChange={handleChange}
            />
            <button className="yhw_dupCheckBtn">중복확인</button>
>>>>>>> 653a7cd12dcc891b2bd7fbca801f3a95682d62ef
          </div>
          <div className="yhw_signInputBox">
            <span className="yhw_signInputTit">나이</span>
            <input
              className="yhw_lastSignInput"
              // value={userAddress}
              // onChange={(e) => setUserAddress(e.target.value)}
<<<<<<< HEAD
              type="number"
              placeholder="나이"
              required
              />
=======
              type="text"
              name="age"
              placeholder="나이"
              value={userData.age}
              onChange={handleChange}
            />
>>>>>>> 653a7cd12dcc891b2bd7fbca801f3a95682d62ef
            <span>세</span>
          </div>
          <div className="yhw_signInputBox">
            <span className="yhw_signInputTit">성별</span>
<<<<<<< HEAD
              <div className="yhw_signGenderBtns">
                <button>남자</button>
                <button>여자</button>
              </div>
          </div>
          <div className="yhw_signUpBtnBox">
            <button type="submit">회원가입</button>
          </div>
        </form>
      </div>  {/* yhw_container 끝 */}
      
      {/* <Footer /> */}
=======
            <div className="yhw_signGenderBtns">
              <button>남자</button>
              <button>여자</button>
            </div>
          </div>
          <div className="yhw_signUpBtnBox">
            <button type="submit" onClick={submitBtn}>
              회원가입
            </button>
          </div>
        </form>
      </div>{" "}
      {/* yhw_container 끝 */}
      <Footer />
>>>>>>> 653a7cd12dcc891b2bd7fbca801f3a95682d62ef
    </>
  );
};

export default SignUpMail;
