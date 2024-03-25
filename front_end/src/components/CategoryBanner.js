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

function CategoryBanner({ selectedCategory }) {
    return (
        <CenteredContainer>
            <BannerContainer>
                <div>
                    경영/경제
                    {selectedCategory}
                </div>
            </BannerContainer>
        </CenteredContainer>
    );
}
export default CategoryBanner;