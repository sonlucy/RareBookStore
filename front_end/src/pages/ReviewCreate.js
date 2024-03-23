import React, { useState } from 'react';
import styled from 'styled-components';

const CenteredContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ReviewCreateContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 875px;
    height: 325px;
    border: 1px black solid;
    position: relative;
`;

const BookImageContainer = styled.div`
    width: 153px;
    height: 325px;
`;

const BookImage = styled.div`
    width: 128px;
    height: 192px;
    background-image: url("/book.jpg");
`;

const BookInfoContainer = styled.div`
    width: 154px;
    height: 325px;
`;

const ReviewContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    width: 568px;
    height: 325px;
    margin-left: 40px;
`;

const RadioButtonContainer = styled.div`
    display: block;
    height: 31px;
    margin-bottom: 10px;
`;

const RadioButtonLabel = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 55px;
    border: 1px solid red;
    border-radius: 10px;
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

const ReviewTextWrite = styled.textarea`
    width: 407px;
    height: 112px;
    resize: none;
    border: 1px solid #ccc;
    margin-top: 10px;
    font-size: 16px;
`;

const ReviewSaveButton = styled.button`
    width: 109px;
    height: 39px;
    background-color: #C87E66;
    color: white;
    border-radius: 10px;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
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
            <CenteredContainer>
                <ReviewCreateContainer>
                    <BookImageContainer>
                        <BookImage />
                    </BookImageContainer>
                    <BookInfoContainer>
                        <span>12,000원</span>
                        <br />
                        <span>판매자 아기사자</span>
                        <br />
                        <span>상태 등급 최상</span>
                    </BookInfoContainer>
                    <ReviewContainer>
                        <RadioButtonContainer>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <label style={{ marginRight: `5px` }}>상태 만족도</label>
                                <RadioButtonLabel isSelected={selectedStatus === '1'} onClick={() => handleStatusChange('1')}><RadioButtonInput type="radio" name="status" value="1" />1점</RadioButtonLabel>
                                <RadioButtonLabel isSelected={selectedStatus === '2'} onClick={() => handleStatusChange('2')}><RadioButtonInput type="radio" name="status" value="2" />2점</RadioButtonLabel>
                                <RadioButtonLabel isSelected={selectedStatus === '3'} onClick={() => handleStatusChange('3')}><RadioButtonInput type="radio" name="status" value="3" />3점</RadioButtonLabel>
                                <RadioButtonLabel isSelected={selectedStatus === '4'} onClick={() => handleStatusChange('4')}><RadioButtonInput type="radio" name="status" value="4" />4점</RadioButtonLabel>
                                <RadioButtonLabel isSelected={selectedStatus === '5'} onClick={() => handleStatusChange('5')}><RadioButtonInput type="radio" name="status" value="5" />5점</RadioButtonLabel>
                            </div>
                        </RadioButtonContainer>
                        <RadioButtonContainer>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <label style={{ marginRight: `5px` }}>재거래 희망</label>
                                <RadioButtonLabel isSelected={selectedDesire === 'yes'} onClick={() => handleDesireChange('yes')}><RadioButtonInput type="radio" name="desire" value="yes" />예</RadioButtonLabel>
                                <RadioButtonLabel isSelected={selectedDesire === 'no'} onClick={() => handleDesireChange('no')}><RadioButtonInput type="radio" name="desire" value="no" />아니오</RadioButtonLabel>
                            </div>
                        </RadioButtonContainer>
                        <label htmlFor="reviewText">후기</label>
                        <ReviewTextWrite
                            id="reviewText"
                            placeholder="후기를 작성해주세요..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                        />
                        </ReviewContainer>
                        <ReviewSaveButton>후기 남기기</ReviewSaveButton>
                </ReviewCreateContainer>
            </CenteredContainer>
        </div>
    );
}

export default ReviewCreate;
