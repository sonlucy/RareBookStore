<<<<<<< HEAD
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
=======
import React, { useEffect } from "react";
import "../styled/StateCategory.css";
import { Link } from "react-router-dom";

const StateCategory = ({ onStateChange }) => {
  
  useEffect(() => {
    // 모든 상태 요소 선택
    const stateWraps = document.querySelectorAll('.yhw_stateWrap');
  
    // 모든 상태 요소에 대해 순회하면서 초기 스타일 적용
    stateWraps.forEach(stateWrap => {
      const stateText = stateWrap.querySelector('.yhw_state').textContent; // 상태 요소 내의 텍스트 선택
      const stateCount = stateWrap.querySelector('.yhw_stateCount'); // 상태 요소 내의 개수 요소 선택
      const stateState = stateWrap.querySelector('.yhw_state'); // 상태 요소 내의 상태 요소 선택
  
      if (stateText === '최상') { // 선택한 상태가 최상인지 확인
        stateCount.style.color = 'orange'; // 주황색으로 변경
        stateState.style.color = 'black'; // 검정색으로 변경
        stateState.style.fontWeight = 'bold'; // bold체로 변경
      }
    });
  }, []); // 빈 배열을 전달하여 최초 한 번만 실행되도록 설정
  
  // 클릭 이벤트 핸들러
  const handleStateClick = (selectedStt) => {
    onStateChange(selectedStt); // 선택된 상태를 부모 컴포넌트(= BuyDetail.js)로 전달
    
    // 선택한 상태에 따라 CSS를 변경
    const stateWraps = document.querySelectorAll('.yhw_stateWrap'); // 모든 상태 요소 선택
    stateWraps.forEach(stateWrap => {
      const stateText = stateWrap.querySelector('.yhw_state').textContent; // 상태 요소 내의 텍스트 선택
      const stateCount = stateWrap.querySelector('.yhw_stateCount'); // 상태 요소 내의 개수 요소 선택
      const stateState = stateWrap.querySelector('.yhw_state'); // 상태 요소 내의 상태 요소 선택
      if (stateText === selectedStt) { // 선택한 상태와 일치하는지 확인
        stateCount.style.color = 'orange'; // 주황색으로 변경
        stateState.style.color = 'black'; // 검정색으로 변경
        stateState.style.fontWeight = 'bold'; // bold체로 변경
      } else {
        stateCount.style.color = ''; // 기본색으로 변경
        stateState.style.color = ''; // 기본색으로 변경
        stateState.style.fontWeight = ''; // 기본체로 변경
      }
    });
  };
  
  return (
    <div className="yhw_stateCatBox"> {/* 상태 카테고리 전체 공간 div */}
      <div className="yhw_stateBox">  {/* 상태 카테고리 각 상자 div */}
        <div className="yhw_stateWrap" onClick={() => handleStateClick('최상')}>  {/* 상태 카테고리 클릭 가능한 범위 지정 div */}
          <span className="yhw_stateCount">{/* 개수 받아올 부분 */}5</span>
          <span className="yhw_state">{/* 상태or판매/구매 받아올 부분 */}최상</span>
        </div>
      </div>
      <div className="yhw_stateBox">
        <div className="yhw_stateWrap" onClick={() => handleStateClick('상')}>
          <span className="yhw_stateCount">{/* 개수 받아올 부분 */}1</span>
          <span className="yhw_state">{/* 상태or판매/구매 받아올 부분 */}상</span>
        </div>
      </div>
      <div className="yhw_stateBox">
        <div className="yhw_stateWrap" onClick={() => handleStateClick('중')}>
          <span className="yhw_stateCount">{/* 개수 받아올 부분 */}2</span>
          <span className="yhw_state">{/* 상태or판매/구매 받아올 부분 */}중</span>
        </div>
>>>>>>> 653a7cd12dcc891b2bd7fbca801f3a95682d62ef
      </div>
    </div>
  );
}

export default StateCategory;