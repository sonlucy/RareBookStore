import React from "react";
import "../styled/StateCategory.css";

const StateCategory = () => {
  return (
    <div className="w_stateCatBox">
      <div className="w_stateBox">
        <span className="w_stateCount">{/* 개수 받아올 부분 */}5</span>
        <span className="w_state">{/* 상태or판매/구매 받아올 부분 */}최상</span>
      </div>
      <div className="w_stateBox">
        <span className="w_stateCount">{/* 개수 받아올 부분 */}1</span>
        <span className="w_state">{/* 상태or판매/구매 받아올 부분 */}상</span>
      </div>
      <div className="w_stateBox">
        <span className="w_stateCount">{/* 개수 받아올 부분 */}2</span>
        <span className="w_state">{/* 상태or판매/구매 받아올 부분 */}중</span>
      </div>
    </div>
  );
}

export default StateCategory;