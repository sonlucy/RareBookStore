import React from "react";
import "../styled/StateCategory.css";
import { Link } from "react-router-dom";

const StateCategory = () => {
  return (
    <div className="yhw_stateCatBox">
      <div className="yhw_stateBox">
        <Link to="/"> {/* "상태=최상"인 DetailConts 내용 가져올 부분 */}
          <span className="yhw_stateCount">{/* 개수 받아올 부분 */}5</span>
          <span className="yhw_state">{/* 상태or판매/구매 받아올 부분 */}최상</span>
        </Link>
      </div>
      <div className="yhw_stateBox">
        <Link to="/"> {/* "상태=상"인 DetailConts 내용 가져올 부분 */}
        <span className="yhw_stateCount">{/* 개수 받아올 부분 */}1</span>
        <span className="yhw_state">{/* 상태or판매/구매 받아올 부분 */}상</span>
        </Link>
      </div>
      <div className="yhw_stateBox">
        <Link to="/"> {/* "상태=중"인 DetailConts 내용 가져올 부분 */}
        <span className="yhw_stateCount">{/* 개수 받아올 부분 */}2</span>
        <span className="yhw_state">{/* 상태or판매/구매 받아올 부분 */}중</span>
        </Link>
      </div>
    </div>
  );
}

export default StateCategory;