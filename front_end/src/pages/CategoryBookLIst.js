import React from "react";
import CategoryBanner from "../components/CategoryBanner";
import ProductList from "../components/ProductList";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// ============== Style component ============== //
const PurchaseRequestContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 1251px;
  height: 115px;
  margin: auto;
`;

const PurchaseRequest = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0 6vw; // 카테고리 링크를 가려서 padding 크기 수정.
  margin: 0;
`;

const Title = styled.h3`
  font-size: 22px;
  margin-right: 4rem;
`;

const Button = styled.a`
  background-color: #c87e66;
  color: white;
  width: 156px;
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9375rem;
  text-decoration: none;
`;
// ============== Style component ============== //


const CategoryBookList = () => {
  // 카테고리이름 가져오기
  const [bookList, setBookList] = useState([]);
  const { category, search } = useParams();

const getBuyBookList = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3001/buyerbook/category/${category}`
    );
    const data = response.data;
    const updatedBookList = await getUserNicknames(data);

    // URL에서 검색어 가져오기
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchQuery = urlParams.get('q');
    console.log("검색어:", searchQuery);

    // 검색어가 존재하면 필터링을 적용하여 업데이트된 도서 목록 설정
    if (searchQuery) {
      const filteredBooks = updatedBookList.filter(book => 
        book.author.includes(searchQuery) || book.itemTitle.includes(searchQuery)
      );
      setBookList(filteredBooks);
    } else {
      // 검색어가 없으면 그대로 도서 목록 설정
      setBookList(updatedBookList);
    }
  } catch (error) {
    console.error("구매희망 책 리스트를 가져올수 없습니다.", error);
  }
};


  const getUserNicknames = async (data) => {
    try {
      const custKeys = data.map((user) => user.custKey);
      const responses = await Promise.all(
        custKeys.map((custKey) =>
          axios.get(`http://localhost:3001/customers/${custKey}`)
        )
      );
      const nickNames = responses.map((response) => response.data.nickname);
      const updatedBookList = data.map((user, index) => ({
        ...user,
        nickname: nickNames[index],
      }));
      return updatedBookList;
    } catch (error) {
      console.error("사용자의 닉네임을 가져올 수 없습니다.", error);
      return [];
    }
  };

  useEffect(() => {
    getBuyBookList();
  }, [category, search]);

  return (
    <div>
      <Header />
      <PurchaseRequestContainer>
        <PurchaseRequest>
          <Title>구매 희망 상품 등록</Title>
          <Button href="/Mypage/RegRequest">상품 등록 요청</Button>
        </PurchaseRequest>
      </PurchaseRequestContainer>
      <CategoryBanner category={category} />
      {bookList.map((book, index) => (
        <ProductList key={index} bookList={book} />
      ))}

      <Footer />
    </div>
  );
};

export default CategoryBookList;
