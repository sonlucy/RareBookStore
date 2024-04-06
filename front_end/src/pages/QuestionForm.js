import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "../styled/FormView.css";
import "../styled/PurchaseHistory.css";
import QuestSide from "../components/QuestSide";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { LoginContext } from "../components/LoginContext";

function QuestionItem({ question, replies, index }) {
  const [showContent, setShowContent] = useState(false);

  // 컴포넌트 상태로 질문 내용의 펼침 여부를 관리.
  const toggleContent = () => {
    setShowContent(!showContent);
  };

  return (
    <div className="question-item">
      {/* 질문 헤더 클릭 시 내용을 펼치는 토글 기능 */}
      <div className="question-header" onClick={toggleContent}>
        {/* 질문 번호를 표시 */}
        <span className="question-number">{index + 1}</span>
        {/* 질문 제목을 표시 */}
        <span className="question-title">{question.boardTitle}</span>
      </div>
      {/* 펼쳐진 경우 질문 내용과 해당 질문에 대한 답변을 표시 */}
      {showContent && (
        <div className="question-content">
          {/* 질문 내용을 표시 */}
          <p>{question.Enquiry}</p>
          {/* 해당 질문에 대한 답변을 매핑하여 표시 */}
          {replies.map((reply) => (
            <div key={reply.replyKey}>
              {/* 답변 라벨과 내용을 표시 */}
              <p>답변: {reply.reply}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function QuestionForm() {
  const [questions, setQuestions] = useState([]); // 질문 목록을 저장하는 상태
  const [replies, setReplies] = useState([]); // 답변 목록을 저장하는 상태
  const [title, setTitle] = useState(""); // 새 질문의 제목을 저장하는 상태
  const [content, setContent] = useState(""); // 새 질문의 내용을 저장하는 상태
  const { loginUser } = useContext(LoginContext); // 로그인된 사용자 정보(custKey)를 가져오는 컨텍스트

  // 새 질문을 서버에 제출하는 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newQuestion = {
      boardTitle: title,
      Enquiry: content,
      custKey: loginUser,
    };

    try {
      // 새 질문을 서버에 POST 요청하여 제출.
      await axios.post("http://localhost:3001/enquiries", newQuestion);
      // 제출 후 질문 목록을 업데이트하고 입력 필드를 초기화.
      getEnquiry();
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error submitting enquiry:", error);
    }
  };

  // 서버로부터 사용자의 질문 목록을 가져오는 함수
  const getEnquiry = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/enquiries/${loginUser}`
      );
      // 가져온 질문 목록을 상태에 저장.
      setQuestions(response.data);
    } catch (error) {
      console.error("문의내용을 가져올 수 없습니다.", error);
    }
  };

  // 서버로부터 모든 답변 목록을 가져오는 함수
  const getReply = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/reply`);
      // 가져온 답변 목록을 상태에 저장.
      setReplies(response.data);
    } catch (error) {
      console.error("문의내용을 가져올 수 없습니다.", error);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 서버에서 질문 목록과 답변 목록을 가져옴.
  useEffect(() => {
    getEnquiry();
    getReply();
  }, []);

  return (
    <>
      <div className="height-container">
        <Header />
        <div className="yhw_container">
          <div className="yhw_purHistCont">
            <div className="yhw_MypageSideAdd">
              <div className="qna-page-sidebar">
                <QuestSide />
              </div>
            </div>
            <div className="yhw_purHistMainCont">
              <div className="Qna_home">
                {/* Q&A 섹션 제목 */}
                <h2 className="qna_main_title">QnA</h2>

                <form onSubmit={handleSubmit} className="cyj_QNAformBox">
                  <div className="cyj_QNAlableNinput">
                    <label htmlFor="title">문의 제목</label>

                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="input-field"
                      placeholder="제목을 입력하세요"
                    />
                  </div>
                  <div className="cyj_QNAlableNinput">
                    <label htmlFor="content">문의 내용</label>
                    {/* 질문 내용 입력 필드 */}

                    <textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="input-field-view"
                      placeholder="내용을 입력하세요"
                    />
                  </div>
                  <br />
                  {/* 질문 제출 버튼 */}
                  <button type="submit" className="submit-button">
                    등록하기
                  </button>
                </form>
                {/* 질문 목록 표시 */}
                <div className="question-list">
                  <h2>등록된 문의</h2>
                  {/* 등록된 질문이 없는 경우 메시지를 표시. */}
                  {questions.length === 0 ? (
                    <p>등록된 문의가 없습니다.</p>
                  ) : (
                    // 등록된 질문을 매핑하여 QuestionItem 컴포넌트로 표시.
                    questions.map((question, index) => (
                      <QuestionItem
                        key={index}
                        question={question}
                        // 해당 질문에 대한 답변 목록을 필터링하여 전달.
                        replies={replies.filter(
                          (reply) => reply.boardKey === question.boardKey
                        )}
                        index={index}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default QuestionForm;
