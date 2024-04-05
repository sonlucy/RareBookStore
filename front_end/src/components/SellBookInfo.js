
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";


const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const BookInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 610px;
  height: 183px;
`;

const BookImage = styled.div`
    width: 122px;
    height: 183px;
    background-image: url('/book.jpg'); // 나중에 변경할 수 있음
`;

const BookInfo = styled.div`
    text-align: left;
    width: 176px;
    height: 183px;
    margin-left: 10px;
`;

const TitleSpan = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 3px;
`;

const InfoSpan = styled.div`
    font-size: 15px;
    font-weight: medium;
`;

function SellBookInfo({ itemBuyKey }) {
  const [buyerBooks, setBuyerBooks] = useState([]);

  useEffect(() => {
    fetchBuyerBooks();
  }, []);

  const fetchBuyerBooks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/buyerbook/item/${itemBuyKey}`
      );
      setBuyerBooks(response.data[0]);
    } catch (error) {
      console.error("Error fetching buyer books:", error);
    }
  };

  return (
    <div>
      <CenteredContainer>
        <BookInfoContainer>
          <BookImage></BookImage>
          <BookInfo>
            <TitleSpan>{buyerBooks.itemTitle}</TitleSpan>
            <InfoSpan>
              {buyerBooks.author} | {buyerBooks.publisher}
            </InfoSpan>
          </BookInfo>
        </BookInfoContainer>
      </CenteredContainer>
    </div>
  );
}

export default SellBookInfo;
