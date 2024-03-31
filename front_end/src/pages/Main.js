import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Title from "../components/Title";
import PurchaseRequest from "../components/PurchaseRequest";
import RecentBooks from "../components/RecentBooks";

const recentBooks = [
  { title: "눈물꽃소년", image: "img/book.png" },
  { title: "스무살을 가장 존중한다", image: "img/book2.png" },
  { title: "직장상사악령퇴치부", image: "img/book3.png" },
  { title: "로기완을 만났다", image: "img/book4.png" },
  { title: "우리할아버지", image: "img/book5.png" },
  { title: "Book 6", image: "img/book.png" },
  { title: "Book 7", image: "img/book.png" },
  { title: "Book 8", image: "img/book.png" },
  { title: "Book 9", image: "img/book.png" },
  { title: "Book 10", image: "img/book.png" },
];


function Main() {


  return (
    <>
      <div className="height-container">
      <Header />
      <Title />
      <RecentBooks books={recentBooks} titleText="최근 구매 희망 도서" />
      <RecentBooks books={recentBooks} titleText="최근 판매 도서" />
      <PurchaseRequest />
    </div>
      <Footer />
    </>
  );
}

export default Main;
