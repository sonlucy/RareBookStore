import React, { useRef, useState } from "react";
import "../styled/DropDownSort.css";

const DropDownSort = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <div className="yhw_dropdownBox">
      <select
        value={selectedOption}
        // onChange={(e) => handleSelect(e.target.value)}
      >
        <option value="">가격 낮은 순</option>
        <option value="">판매자 등급 높은 순</option>
        {/* <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))} */}
      </select>
    </div>
  );
};

export default DropDownSort;