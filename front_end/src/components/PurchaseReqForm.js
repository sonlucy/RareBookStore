import React, { useState } from 'react';
import styled from 'styled-components';
import PurchaseReqList from './PurchaseReqListOngoing';

const Container = styled.div`
  margin: 0 auto; 
  padding: 2vw; 
  max-width: 1200px;
`;

const PurchaseRequestForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

const FormItem = styled.div`
  margin-bottom: 1rem;
/*   display: flex; */
  flex-direction: row;
  align-items: center;
/*   width: 100%; */
/*   align-items: flex-start;  */
/*   @media screen and (max-width: 768px) {
    margin-bottom: 0.4rem; 
  }
  @media screen and (max-width: 425px) {
    margin-bottom: 0.2rem; 
  } */
`;


const Label = styled.label`
  margin-right: 1rem; 
/*   font-size: 1.3rem; */
  font-size: 15px;
  font-weight: bold;
/*   @media screen and (max-width: 768px) {
    font-size: 1rem; 
  }
  @media screen and (max-width: 425px) {
    font-size: 0.8rem; 
  } */
`;

const Input = styled.input`
  flex-grow: 1;
/*   padding: 0.5rem; */
  border-radius: 10px;
  border: 1px solid ${({ hasError }) => (hasError ? 'red' : '#ccc')}; // 빨간 테두리
/*   height: 2.5rem; */
  height: 42px;
/*   font-size: 1.2rem; */
font-size: 16px;
  width: 760px; /*  */

/*   @media screen and (max-width: 1000px) {
    width: 30rem;
  }
  @media screen and (max-width: 700px) {
    width: 20rem;
  }
    @media screen and (max-width: 500px) {
    width: 10rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 1rem; 
    height: 2rem;
  }
  @media screen and (max-width: 425px) {
    font-size: 0.7rem; 
    height: 1.2rem;
  } */
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: flex-start; 
  margin-top: 0.5rem; 
  padding-left: 6rem;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.8rem;

  @media screen and (max-width: 425px) {
    font-size: 0.5rem; 
  }
`;

const SubmitButton = styled.button`
  background-color: #F4F4F4;
  color: black;
/*   padding: 0.8rem 2rem; */
  border: none;
  border-radius: 4px;
  cursor: pointer;
/*   font-size: 1.3rem; */
  font-size: 15px;
  font-weight: bold;
/*   width: 200px; */
width: 156px;
height: 46px;
  margin-top: 1rem; 
  align-self: flex-end;

  &:hover {
    background-color: #dadada;
  }

/*   &:active {
    background-color: #bebebe;
  } */

  @media screen and (max-width: 768px) {
    font-size: 1rem;
    width: 150px;
  }
  @media screen and (max-width: 425px) {
    font-size: 0.7rem; 
    width: 100px;
    padding: 0.4rem 1rem;
  }
`;


const DeadlineSelection = styled.div`
  display: flex;
  margin-top: 1rem;
/* align-items: flex-start; */
/*   flex-wrap: wrap; */
`;

const DeadlineOptionsContainer = styled.div`
  display: flex;
  justify-content: center; /* 옵션들을 가운데 정렬 */
  
  @media screen and (max-width: 500px) {
    flex-direction: column; /* 화면 폭이 500px 이하일 때 세로로 정렬 */
    align-items: center; /* 세로 정렬 시 가운데 정렬 */
    
  }
`;

/* const DeadlineOption = styled.div` */
const DeadlineOption = styled.label`
  margin-right: 1rem;
/*   font-size: 1.2rem; */
  font-size: 15px;
  cursor: pointer;
  display: flex;
  justify-content: center; 
  align-items: center;
  width: 10rem;
  height: 32px;
  border: 1px solid #ccc;
  border-radius: 7px;

  transition: background-color 0.3s;
  &:hover {
    background-color: #e9e8e7;
  }

  
  input[type="radio"] {
    display: none;
  }
input[type="radio"]:checked + & {
    background-color: #e9e8e7;
  }

  input[type="radio"]:checked + span {
    font-weight: bold;
    color: #8f4101;
  }
/*   @media screen and (max-width: 1000px) {
    width: 5rem;
  }
  @media screen and (max-width: 700px) {
    width: 3rem;
  }
  @media screen and (max-width: 500px) {
    width: 6rem;
    margin-bottom: 0.2rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 1rem; 
  }
  @media screen and (max-width: 425px) {
    font-size: 0.7rem; 
  } */

`;

const PurchaseReqForm = () => {
  const [errors, setErrors] = useState({}); // 입력 필드 에러 상태관리
  const [deadline, setDeadline] = useState(''); // 입찰 마감 기한 상태관리

  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: false }); // 에러 재설정
  };
  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
    setErrors({ ...errors, deadline: false });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const bookTitle = document.getElementById('bookTitle').value;
    const author = document.getElementById('author').value;
    const publisher = document.getElementById('publisher').value;
    /*     const email = document.getElementById('email').value;
        const phoneNumber = document.getElementById('phoneNumber').value; */

    if (!bookTitle || !author || !publisher || !deadline) {
      // alert('모든 항목을 작성해야 등록 신청할 수 있습니다.');
      setErrors({
        bookTitle: !bookTitle,
        author: !author,
        publisher: !publisher,
        deadline: !deadline,
        /*         email: !email,
                phoneNumber: !phoneNumber, */
      });
      return;
    }
    alert('등록 신청되었습니다.');
  };

  return (
    <Container>
      <PurchaseRequestForm onSubmit={handleSubmit}>
        <FormItem>
          <Label htmlFor="bookTitle">책 제목</Label>
          <Input
            type="text"
            id="bookTitle"
            name="bookTitle"
            placeholder="책 제목"
            hasError={errors.bookTitle} // 에러가 있는 경우 빨간 테두리 추가
            onChange={handleChange} // 입력값 변경 시 에러 재설정
          />
          <ErrorContainer>
            {errors.bookTitle && <ErrorMessage>* 책 제목을 입력하세요.</ErrorMessage>}
          </ErrorContainer>
        </FormItem>
        <FormItem>
          <Label htmlFor="author">책 저자</Label>
          <Input
            type="text"
            id="author"
            name="author"
            placeholder="책 저자"
            hasError={errors.author}
            onChange={handleChange}
          />
          <ErrorContainer>
            {errors.author && <ErrorMessage>* 책 저자를 입력하세요.</ErrorMessage>}
          </ErrorContainer>
        </FormItem>
        <FormItem>
          <Label htmlFor="publisher">출판사</Label>
          <Input
            type="text"
            id="publisher"
            name="publisher"
            placeholder="출판사"
            hasError={errors.publisher}
            onChange={handleChange}
          />
          <ErrorContainer>
            {errors.publisher && <ErrorMessage>* 출판사를 입력하세요.</ErrorMessage>}
          </ErrorContainer>
        </FormItem>
        {/* 여기에 입찰마감기한 */}
        <DeadlineSelection>
          <Label htmlFor="">입찰 마감기한</Label>
          <DeadlineOptionsContainer>
            <DeadlineOption>
              <input
                type="radio"
                id="1Day"
                name="deadline"
                value="1일"
                onChange={handleDeadlineChange}
              />
              <span>1일</span>
            </DeadlineOption>
            <DeadlineOption>
              <input
                type="radio"
                id="7Days"
                name="deadline"
                value="7일"
                onChange={handleDeadlineChange}
              />
              <span>7일</span>
            </DeadlineOption>
            <DeadlineOption>
              <input
                type="radio"
                id="30Days"
                name="deadline"
                value="30일"
                onChange={handleDeadlineChange}
              />
              <span>30일</span>
            </DeadlineOption>
            <DeadlineOption>
              <input
                type="radio"
                id="60Days"
                name="deadline"
                value="60일"
                onChange={handleDeadlineChange}
              />
              <span>60일</span>
            </DeadlineOption>

          </DeadlineOptionsContainer>

        </DeadlineSelection>
        {errors.deadline && (
          <ErrorContainer>
            <ErrorMessage>* 입찰 마감기한을 선택하세요.</ErrorMessage>
          </ErrorContainer>
        )}

        <SubmitButton type="submit">등록 신청</SubmitButton>
      </PurchaseRequestForm>
{/*       <PurchaseReqList title={formData.title} info={`${formData.author} | ${formData.publisher}`} image={formData.image} /> */}
    </Container>
  );
};

export default PurchaseReqForm;