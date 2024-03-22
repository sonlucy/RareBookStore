import React, { useState } from 'react';
import PurchaseReqList from './PurchaseReqListOngoing';
import '../styled/PurchaseReqForm.css'; // CSS 파일 import

const PurchaseReqForm = () => {
  const [errors, setErrors] = useState({}); // 입력 필드 에러 상태관리
  const [deadline, setDeadline] = useState(''); // 입찰 마감 기한 상태관리

  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: false }); // 에러 재설정
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
    setErrors({ ...errors, deadline: false });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const bookTitle = document.getElementById('bookTitle').value;
    const author = document.getElementById('author').value;
    const publisher = document.getElementById('publisher').value;

    if (!bookTitle || !author || !publisher || !deadline) {
      setErrors({
        bookTitle: !bookTitle,
        author: !author,
        publisher: !publisher,
        deadline: !deadline,
      });
      return;
    }
    alert('등록 신청되었습니다.');
  };

  return (
    <div className="sbk-container"> 
      <form className="sbk-purchase-request-form" onSubmit={handleSubmit}> 
        <div className="sbk-form-item">
          <label className="sbk-label" htmlFor="bookTitle">책 제목</label>
          <input
            type="text"
            id="bookTitle"
            name="bookTitle"
            className="sbk-input"
            placeholder="책 제목"
            onChange={handleChange}
          />
          <div className="sbk-error-container">
            {errors.bookTitle &&<span className="sbk-error-message">* 책 제목을 입력하세요.</span>}
          </div>
        </div>
        <div className="sbk-form-item">
          <label className="sbk-label" htmlFor="author">책 저자</label>
          <input
            type="text"
            id="author"
            name="author"
            className="sbk-input"
            placeholder="책 저자"
            onChange={handleChange}
          />
          <div className="sbk-error-container">
            {errors.author && <span className="sbk-error-message">* 책 저자를 입력하세요.</span>}
          </div>
        </div>
        <div className="sbk-form-item">
          <label className="sbk-label" htmlFor="publisher">출판사</label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            className="sbk-input"
            placeholder="출판사"
            onChange={handleChange}
          />
          <div className="sbk-error-container">
            {errors.publisher && <span className="sbk-error-message">* 출판사를 입력하세요.</span>}
          </div>
        </div>
        <div className="sbk-deadline-selection">
          <label className="sbk-label" htmlFor="">입찰 마감기한</label>
          <div className="sbk-deadline-options-container">
            <label className="sbk-deadline-option">
              <input
                type="radio"
                id="1Day"
                name="deadline"
                value="1일"
                onChange={handleDeadlineChange}
              />
              <span>1일</span>
            </label>
            <label className="sbk-deadline-option">
              <input
                type="radio"
                id="7Days"
                name="deadline"
                value="7일"
                onChange={handleDeadlineChange}
              />
              <span>7일</span>
            </label>
            <label className="sbk-deadline-option">
              <input
                type="radio"
                id="30Days"
                name="deadline"
                value="30일"
                onChange={handleDeadlineChange}
              />
              <span>30일</span>
            </label>
            <label className="sbk-deadline-option">
              <input
                type="radio"
                id="60Days"
                name="deadline"
                value="60일"
                onChange={handleDeadlineChange}
              />
              <span>60일</span>
            </label>
          </div>  {/* sbk-deadline-options-container */}
        </div> {/* sbk-deadline-selection */}

          <div className="sbk-error-container">
            {errors.deadline && <span className="sbk-error-message">* 입찰 마감기한을 선택하세요.</span>}
          </div>

        <button type="submit" className="sbk-submit-button">등록 신청</button>
      </form>
      {/* PurchaseReqList 컴포넌트 */}
    </div>
  );
};

export default PurchaseReqForm;
