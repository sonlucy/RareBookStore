import React, { useState } from "react";

const useGenderSelection = () => {
  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderButtonClick = (gender) => {
    // 현재 선택된 성별과 클릭한 성별이 같으면 선택을 해제하고, 다르면 선택을 업데이트합니다.
    if (selectedGender === gender) {
      setSelectedGender(null); // 선택 해제
    } else {
      setSelectedGender(gender); // 선택 업데이트
    }
  };

  return {
    selectedGender,
    handleGenderButtonClick,
  };
}

export default useGenderSelection;