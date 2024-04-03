import React, { useState } from 'react';
import styled from 'styled-components';

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
    height: 60%;
    background-image: url("/book.jpg");
    background-size: contain;
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
    border: 1px solid #C87E66;
    border-radius: 5px;
    margin-right: 5px;
    cursor: pointer;
    background-color: ${({ isSelected }) => (isSelected ? '#007bff' : '#fff')};
    color: ${({ isSelected }) => (isSelected ? '#fff' : '#000')};
    font-size: 14px;

    &:hover {
        background-color: ${({ isSelected }) => (isSelected ? '#0056b3' : '#f0f0f0')};
        color: ${({ isSelected }) => (isSelected ? '#fff' : '#000')};
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
        color: #A1A1A1;
    }
`;

const ReviewSaveButton = styled.button`
    width: 109px;
    height: 39px;
    background-color: #C87E66;
    color: white;
    border-radius: 5px;
    border: none;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 20px;

    &:hover {
        background-color: #ab705c;
    }
`;

function ReviewCreate(props) {
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedDesire, setSelectedDesire] = useState(null);
    const [reviewText, setReviewText] = useState('');

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
    };

    const handleDesireChange = (desire) => {
        setSelectedDesire(desire);
    };

    return (
        <div>
            <ContentContainer>
                <ReviewCreateContainer>
                    <BookImgInfoContainer>
                        <BookImage />
                        <BookInfoContainer>
                            <span style={{fontSize:"20px", fontWeight:"medium", marginBottom:"10px"}}>12,000원</span>
                            <span style={{fontSize:"14px", fontWeight:"medium", marginBottom:"20px", color:"#C87E66"}}>판매자 아기사자</span>
                            <span style={{fontSize:"16px", fontWeight:"medium"}}>상태 등급 <span style={{fontWeight:"bold"}}>최상</span></span>
                        </BookInfoContainer>
                    </BookImgInfoContainer>
                    <ReviewContainer>
                        <RadioButtonContainer>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <LableComponent>상태 만족도</LableComponent>
                                {/* <label style={{ marginRight: `5px`, fontSize:'15px', fontWeight:'bold', width:'100px', textAlign:'right' }}>상태 만족도</label> */}
                                <RadioButtonLabel isSelected={selectedStatus === '1'} onClick={() => handleStatusChange('1')}><RadioButtonInput type="radio" name="status" value="1" />1점</RadioButtonLabel>
                                <RadioButtonLabel isSelected={selectedStatus === '2'} onClick={() => handleStatusChange('2')}><RadioButtonInput type="radio" name="status" value="2" />2점</RadioButtonLabel>
                                <RadioButtonLabel isSelected={selectedStatus === '3'} onClick={() => handleStatusChange('3')}><RadioButtonInput type="radio" name="status" value="3" />3점</RadioButtonLabel>
                                <RadioButtonLabel isSelected={selectedStatus === '4'} onClick={() => handleStatusChange('4')}><RadioButtonInput type="radio" name="status" value="4" />4점</RadioButtonLabel>
                                <RadioButtonLabel isSelected={selectedStatus === '5'} onClick={() => handleStatusChange('5')}><RadioButtonInput type="radio" name="status" value="5" />5점</RadioButtonLabel>
                            </div>
                        </RadioButtonContainer>
                        <RadioButtonContainer>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <LableComponent>재거래 희망</LableComponent>
                                {/* <label style={{ marginRight: `5px`, fontSize:'15px', fontWeight:'bold', width:'100px', textAlign:'right' }}>재거래 희망</label> */}
                                <RadioButtonLabel isSelected={selectedDesire === 'yes'} onClick={() => handleDesireChange('yes')}><RadioButtonInput type="radio" name="desire" value="yes" />예</RadioButtonLabel>
                                <RadioButtonLabel isSelected={selectedDesire === 'no'} onClick={() => handleDesireChange('no')}><RadioButtonInput type="radio" name="desire" value="no" />아니오</RadioButtonLabel>
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
                        <ReviewSaveButton>후기 남기기</ReviewSaveButton>
                    </ReviewContainer>
                </ReviewCreateContainer>
            </ContentContainer>
        </div>
    );
}

export default ReviewCreate;
