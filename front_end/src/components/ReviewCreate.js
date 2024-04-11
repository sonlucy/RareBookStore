import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
// import useGetReviews from "../hooks/api/useGetReviews";

const ContentContainer = styled.div`
  width: 100%;
`;

const ReviewCreateContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  /* height: 600px; */
  margin-top: 50px;
  padding: 0;
`;

const BookImgInfoContainer = styled.div`
  /* width: 153px; */
  width: 40%;
  height: 325px;
  display: flex;
`;

const BookImage = styled.div`
  /* width: 128px; */
  width: 40%;
  /* height: 192px; */
  height: 70%;
  background-image: url("${(props) => props.imgBook}");
  background-size: contain;
  background-repeat: no-repeat;
`;

const BookInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  width: 50%;
  /* width: 154px; */
  /* height: 325px; */
`;

const ReviewContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 60%;
  /* width: 568px; */
  height: 325px;
  margin-left: 40px;
`;

const RadioButtonContainer = styled.div`
  display: block;
  height: 31px;
  margin-bottom: 15px;
`;

const RadioButtonLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 30px;
  border: 1px solid #c87e66;
  border-radius: 5px;
  margin-right: 5px;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? "#C87E66" : "#fff")};
  color: ${({ isSelected }) => (isSelected ? "#fff" : "#000")};
  font-size: 14px;

  &:hover {
    background-color: ${({ isSelected }) =>
      isSelected ? "#C87E66" : "#d88e75"};
    color: ${({ isSelected }) => (isSelected ? "#fff" : "#fff")};
  }
`;

const RadioButtonInput = styled.input`
  display: none;
`;

const LableComponent = styled.label`
  font-size: 15px;
  font-weight: bold;
  width: 90px;
  margin-right: 10px;
  text-align: right;
  line-height: 32px;
`;

const ReviewTextWriteContainer = styled.div`
  display: flex;
  width: 100%;
`;

const ReviewTextWrite = styled.textarea`
  /* width: 407px; */
  width: 80%;
  height: 112px;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 5px;
  /* margin-top: 10px; */
  padding: 10px;
  font-size: 16px;
  ::placeholder {
    color: #a1a1a1;
  }
`;

const ReviewSaveButton = styled.button`
  background-color: #c87e66;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-top: 50px;
  font-weight: bold;
  font-size: 0.9375rem;
  width: 9.75rem; /* 156px; */
  height: 2.875rem; /* 46px; */

  &:hover {
    background-color: #ab705c;
  }
`;

function ReviewCreate({ purLists, filteredSellerData }) {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedDesire, setSelectedDesire] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [itemKey, setItemKey] = useState("");

  const { damage, price, sellerKey, custKey, itemSellKey } =
    filteredSellerData[0][0];

  useEffect(() => {
    const getItemKey = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/orders/sellkey/${itemSellKey}`
        );
        const itemKeyNumber = response.data;
        setItemKey(itemKeyNumber[0].itemKey);
        console.log(itemKeyNumber[0]);
      } catch (error) {
        console.error("Error fetching itemKey:", error);
      }
    };

    getItemKey();
  }, [itemSellKey]);

  function getDamageRating(damage) {
    if (damage === 0) {
      return "최상";
    } else if (damage === 1) {
      return "상";
    } else if (damage >= 2) {
      return "중";
    } else {
      return "유효하지 않은 입력입니다."; // damage가 음수인 경우 처리
    }
  }

  const imgBook = purLists.length > 0 ? purLists[0].itemImg : "";

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    console.log(status);
  };

  const handleDesireChange = (desire) => {
    const desireValue = desire === "yes" ? 4 : 2;
    setSelectedDesire(desireValue);

    console.log(desireValue);
  };

  const navigate = useNavigate();
  const handleReviewSave = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!selectedStatus || !selectedDesire || !reviewText) {
      alert("후기를 작성하고 등급을 선택해주세요."); // Display error message
      return; // Exit the function early
    }

    const custReview = {
      itemKey: itemKey,
      custKey: custKey,
      sellerKey: sellerKey,
      satisfaction: selectedStatus,
      repurchase: selectedDesire,
      review: reviewText,
    };

    try {
      // Send a POST request to save the review data
      await axios.post("http://localhost:3001/reviews", custReview);
      // Clear the input fields after successful submission
      setSelectedStatus(null);
      setSelectedDesire(null);
      setReviewText("");
      // Show success message
      alert("후기를 성공적으로 남겼습니다.");
      // Redirect to "/" page
      navigate("/");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div>
      <ContentContainer>
        <ReviewCreateContainer>
          <BookImgInfoContainer>
            <BookImage imgBook={imgBook} />
            <BookInfoContainer>
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "medium",
                  marginBottom: "10px",
                }}
              >
                {price}원
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "medium",
                  marginBottom: "20px",
                  color: "#C87E66",
                }}
              >
                판매자 custKey: {sellerKey}
              </span>
              <span style={{ fontSize: "16px", fontWeight: "medium" }}>
                상태 등급{" "}
                <span style={{ fontWeight: "bold" }}>
                  {getDamageRating(damage)}
                </span>
              </span>
            </BookInfoContainer>
          </BookImgInfoContainer>
          <ReviewContainer>
            <RadioButtonContainer>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <LableComponent>상태 만족도</LableComponent>
                {/* <label style={{ marginRight: `5px`, fontSize:'15px', fontWeight:'bold', width:'100px', textAlign:'right' }}>상태 만족도</label> */}
                <RadioButtonLabel
                  isSelected={selectedStatus === "1"}
                  onClick={() => handleStatusChange("1")}
                >
                  <RadioButtonInput type="radio" name="status" value="1" />
                  1점
                </RadioButtonLabel>
                <RadioButtonLabel
                  isSelected={selectedStatus === "2"}
                  onClick={() => handleStatusChange("2")}
                >
                  <RadioButtonInput type="radio" name="status" value="2" />
                  2점
                </RadioButtonLabel>
                <RadioButtonLabel
                  isSelected={selectedStatus === "3"}
                  onClick={() => handleStatusChange("3")}
                >
                  <RadioButtonInput type="radio" name="status" value="3" />
                  3점
                </RadioButtonLabel>
                <RadioButtonLabel
                  isSelected={selectedStatus === "4"}
                  onClick={() => handleStatusChange("4")}
                >
                  <RadioButtonInput type="radio" name="status" value="4" />
                  4점
                </RadioButtonLabel>
                <RadioButtonLabel
                  isSelected={selectedStatus === "5"}
                  onClick={() => handleStatusChange("5")}
                >
                  <RadioButtonInput type="radio" name="status" value="5" />
                  5점
                </RadioButtonLabel>
              </div>
            </RadioButtonContainer>
            <RadioButtonContainer>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <LableComponent>재거래 희망</LableComponent>
                {/* <label style={{ marginRight: `5px`, fontSize:'15px', fontWeight:'bold', width:'100px', textAlign:'right' }}>재거래 희망</label> */}
                <RadioButtonLabel
                  isSelected={selectedDesire === 4}
                  onClick={() => handleDesireChange("yes")}
                >
                  <RadioButtonInput type="radio" name="desire" value="yes" />예
                </RadioButtonLabel>
                <RadioButtonLabel
                  isSelected={selectedDesire === 2}
                  onClick={() => handleDesireChange("no")}
                >
                  <RadioButtonInput type="radio" name="desire" value="no" />
                  아니오
                </RadioButtonLabel>
              </div>
            </RadioButtonContainer>
            <ReviewTextWriteContainer>
              <LableComponent htmlFor="reviewText">후기</LableComponent>
              {/* <label htmlFor="reviewText" style={{ fontSize:'15px', fontWeight:'bold', width:'100px', textAlign:'right' }}>후기</label> */}
              <ReviewTextWrite
                id="reviewText"
                placeholder="후기를 작성해주세요..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
            </ReviewTextWriteContainer>
            <ReviewSaveButton onClick={handleReviewSave}>
              후기 남기기
            </ReviewSaveButton>
          </ReviewContainer>
        </ReviewCreateContainer>
      </ContentContainer>
    </div>
  );
}

export default ReviewCreate;
