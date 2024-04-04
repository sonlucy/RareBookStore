import React from 'react';
import styled from 'styled-components';

const CenteredContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const BannerContainer = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    /* width: 70vw; */
    width: 100%;
    /* height: 5vw; */
    /* margin: auto;
    margin-top: 50px;
    margin-bottom: 50px; */
`;

// function PurchaseBanner({ selectedBanner }) {
function PurchaseBanner() {
    return (
        <CenteredContainer>
            <BannerContainer>
                <b style={{fontSize:"20px", fontWeight:"bolder"}}>구매 후기 남기기</b>
                {/* {selectedBanner} */}
            </BannerContainer>
        </CenteredContainer>
    );
}
export default PurchaseBanner;