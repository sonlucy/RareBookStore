import React from 'react';
import styled from 'styled-components';

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
    background-image: url('/book.jpg');
`;

const BookInfo = styled.div`
    text-align: center;
    width: 176px;
    height: 183px;
`;


function SellBookInfo(props) {
    return (
        <div>
            <CenteredContainer>
                <BookInfoContainer>
                    <BookImage></BookImage>
                    <BookInfo>
                    <span>폴링인 폴</span>
                    <br />
                    <span>모건하우절 | 문학동네</span>
                    </BookInfo>
                </BookInfoContainer>
            </CenteredContainer>
        </div>
    );
}

export default SellBookInfo;

