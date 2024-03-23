import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const H2 = styled.h2`
  margin-bottom: 52px;
`;
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 520px;
  height: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const Label = styled.label`
  width: 80px;
  margin-right: 10px;
  font-weight: bold;
`;

const InputField = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const SubmitButton = styled.button`
  width: 150px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #c87e66;
  color: #fff;
  cursor: pointer;
  margin: 0 auto;

  &:hover {
    background-color: #0056b3;
  }
`;

const AdditionalLinks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

// const AdditionalLink = styled(Link)`
//   color: #007bff;
//   text-decoration: none;
//   cursor: pointer;

//   &:hover {
//     text-decoration: underline;
//   }
// `;

const IDPWLogin = () => {
  const [userData, setUserData] = useState({
    userid: "",
    userpwd: "",
  });
  const navigate = useNavigate();

  // Login Submit
  const handleLogin = async (event) => {
    event.preventDefault();
    if (Object.values(userData).some((value) => value === "")) {
      alert("아이디와 비밀번호를 입력해주세요");
      return;
    }

    try {
      const res = await fetch("/api/loginCheck", {
        method: "POST",
        body: JSON.stringify(userData),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      alert(data);
      if (res.status === 200) {
        navigate("/");
      } else {
        setUserData({ userid: "", userpwd: "" });
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
    <Container>
      <LoginForm onSubmit={handleLogin}>
        <H2>로그인</H2>
        <FormGroup>
          <Label>아이디</Label>
          <InputField
            type="text"
            name="userid"
            value={userData.userid}
            onChange={handleChange}
            placeholder="아이디를 입력하세요"
          />
        </FormGroup>
        <FormGroup>
          <Label>패스워드</Label>
          <InputField
            type="password"
            name="userpwd"
            value={userData.userpwd}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
          />
        </FormGroup>
        <SubmitButton type="submit">로그인</SubmitButton>
        {/* <AdditionalLinks>
                    <AdditionalLink to="/">아이디 / 비밀번호 찾기</AdditionalLink>
                    <AdditionalLink to="/">회원가입</AdditionalLink>
                </AdditionalLinks> */}
      </LoginForm>
    </Container>
  );
};

//================ 기존코드 ============================//
// const IDPWLogin = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const handleLogin = (e) => {
//         e.preventDefault();
//         console.log('Username:', username);
//         console.log('Password:', password);
//     };

//     return (
//         <Container>
//             <LoginForm onSubmit={handleLogin}>
//                 <H2>로그인</H2>
//                 <FormGroup>
//                     <Label>아이디</Label>
//                     <InputField
//                         type="text"
//                         placeholder="아이디를 입력하세요"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                 </FormGroup>
//                 <FormGroup>
//                     <Label>패스워드</Label>
//                     <InputField
//                         type="password"
//                         placeholder="비밀번호를 입력하세요"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </FormGroup>
//                 <SubmitButton type="submit">로그인</SubmitButton>
//                 {/* <AdditionalLinks>
//                     <AdditionalLink to="/">아이디 / 비밀번호 찾기</AdditionalLink>
//                     <AdditionalLink to="/">회원가입</AdditionalLink>
//                 </AdditionalLinks> */}
//             </LoginForm>
//         </Container>
//     );
// };

export default IDPWLogin;
