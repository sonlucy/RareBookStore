import React from "react";
import styled from "styled-components";

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
  margin: auto;
`;

function CategoryBanner({ category }) {
  const categoryLabels = {
    all: "전체",
    science: "과학",
    economics: "경제/경영",
    novels: "소설/시/희곡",
    comics: "만화",
    arts: "예체능",
    essays: "에세이",
  };
//const categoryLabel = category ? categoryLabels[category] : "전체";
const categoryLabel = categoryLabels[category];
  return (
    <CenteredContainer>
      <BannerContainer>
        {categoryLabel && <h3>{categoryLabel}</h3>}
      </BannerContainer>
    </CenteredContainer>
  );
}
export default CategoryBanner;
