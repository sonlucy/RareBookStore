import React from 'react';
import styled from 'styled-components';

const CenteredContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BannerContainer = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    width: 70vw;
    height: 5vw;
    border: 1px black solid;
    margin: auto;
`;

function PurchaseBanner({ selectedBanner }) {
    return (
        <CenteredContainer>
            <BannerContainer>
                <div>
                    구매후기 남기기
                    {selectedBanner}
                </div>
            </BannerContainer>
        </CenteredContainer>
    );
}
export default PurchaseBanner;