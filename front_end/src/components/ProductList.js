import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

// ============== Style component ============== //
const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductListContainer = styled.div`
  width: 1050px;
  height: 300px;
  display: flex;
  flex-direction: row;
  position: relative;
`;

const ProductImage = styled.div`
  width: 177px;
  height: 268px;
  background: url("/book.jpg");
  margin: 0 36px 29px;
`;

const ProductInfoContainer = styled.div`
  margin: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductInfoTable = styled.table`
  width: 100%;
  margin-bottom: 20px;
`;

const ProductInfoRow = styled.tr`
  display: flex;
  justify-content: space-between;
`;

const ProductInfoCell = styled.td`

  ${({ isTitle }) => isTitle && `
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 5px;
  `}

${({ isAuthor }) => isAuthor && `
    font-size: 15px;
    font-weight: medium;
  `}

${({ isPublisher }) => isPublisher && `
    font-size: 15px;
    font-weight: medium;
  `}

${({ isNickname }) => isNickname && `
    font-size: 15px;
    font-weight: medium;
    color: #c87e66;
  `}

${({ isDeadlinetext }) => isDeadlinetext && `
    font-size: 15px;
    font-weight: bold;
    color: #eb217c;
  `}

${({ isDeadline }) => isDeadline && `
    font-size: 16px;
    font-weight: regular;
  `}

${({ isStatus }) => isStatus && `
    font-size: 14px;
    font-weight: regular;
    color: #828282;
    margin-right: 50px;
  `}

${({ isMinimum }) => isMinimum && `
    font-size: 15px;
    font-weight: bold;
    color: #eb217c;
  `}

${({ isGrade }) => isGrade && `
    font-size: 15px;
    font-weight: regular;
  `}

${({ isPrice }) => isPrice && `
    font-size: 15px;
    font-weight: regular;
    margin-right: 50px;
  `}


`;

const SellButton = styled.button`
  width: 160px;
  height: 50px;
  border-radius: 4px;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.9375rem;
  color: white;
  background-color: #c87e66;
  position: absolute;
  top: 10px;
  right: 20px;
`;

const Divider = styled.span`
  margin: 0 5px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
// ============== Style component ============== //

function ProductList({ bookList }) {
  return (
    <CenteredContainer>
      <ProductListContainer>
        <ProductImage></ProductImage>
        <ProductInfoContainer>
          <ProductInfoTable>
            <tbody>
              <ProductInfoRow>
                <ProductInfoCell isTitle>{bookList.itemTitle}</ProductInfoCell>
              </ProductInfoRow>
              <ProductInfoRow>
                <ProductInfoCell isAuthor>{bookList.author}</ProductInfoCell>
                <Divider>|</Divider>
                <ProductInfoCell isPublisher>{bookList.publisher}</ProductInfoCell>
              </ProductInfoRow>
              <ProductInfoRow>
                <ProductInfoCell isNickname>{bookList.nickname}</ProductInfoCell>
              </ProductInfoRow>
            </tbody>
          </ProductInfoTable>
          <ProductInfoTable>
            <tbody>
              <ProductInfoRow>
                <ProductInfoCell isDeadlinetext>입찰 마감 기한</ProductInfoCell>
              </ProductInfoRow>
              <ProductInfoRow>
                <ProductInfoCell isDeadline>날짜</ProductInfoCell>
                <ProductInfoCell isStatus>진행중</ProductInfoCell>
              </ProductInfoRow>
            </tbody>
          </ProductInfoTable>
          <ProductInfoRow>
            <ProductInfoCell isMinimum>등급별 최저가</ProductInfoCell>
          </ProductInfoRow>
          <ProductInfoRow>
            <ProductInfoCell isGrade>최상</ProductInfoCell>
            <ProductInfoCell isPrice>12,000원</ProductInfoCell>
          </ProductInfoRow>
          <ProductInfoRow>
            <ProductInfoCell isGrade>상</ProductInfoCell>
            <ProductInfoCell isPrice>10,000원</ProductInfoCell>
          </ProductInfoRow>
          <ProductInfoRow>
            <ProductInfoCell isGrade>중</ProductInfoCell>
            <ProductInfoCell isPrice>8,500원</ProductInfoCell>
          </ProductInfoRow>
          <ProductInfoTable>
          </ProductInfoTable>
        </ProductInfoContainer>
        {/* <SellButton to="/SellBook">판매하기</SellButton> */}
        <StyledLink to={`/SellBook/${bookList.itemBuyKey}`}>
          <SellButton>판매하기</SellButton>
        </StyledLink>
      </ProductListContainer>
    </CenteredContainer>
  );
}

export default ProductList;