import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "../styled/FormView.css";
import "../styled/PurchaseHistory.css";
import QuestSide from "../components/QuestSide";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { LoginContext } from "../components/LoginContext";

function QuestionItem({ question, index }) {
  const [showContent, setShowContent] = useState(false);

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  return (
    <div className="question-item">
      <div className="question-header" onClick={toggleContent}>
        <span className="question-number">{index + 1}</span>
        <span className="question-title">{question.boardTitle}</span>
      </div>
      {showContent && (
        <div className="question-content">{question.Enquiry}</div>
      )}
    </div>
  );
}

function QuestionForm() {
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { loginUser } = useContext(LoginContext); // 사용자의 custKey

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newQuestion = {
      boardTitle: title,
      Enquiry: content,
      custKey: loginUser,
    };

    setQuestions([...questions, newQuestion]);
    setTitle("");
    setContent("");

    try {
      // 문의 서버 전송
      await axios.post("http://localhost:3001/enquiries", newQuestion);

      // 전송 후 상태 초기화
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error submitting enquiry:", error);
    }
  };
  // 특정 유저의 문의내용 db에서 가져오기
  const getEnquiry = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/enquiries/${loginUser}`
      );
      setQuestions(response.data); // get으로 문의내용 가져온뒤 questions state 업데이트

      console.log(response.data); // 데이터 잘 들어왔는지 확인용
    } catch (error) {
      console.error("문의내용을 가져올 수 없습니다.", error);
    }
  };
  // 페이지 첫 랜더링할때 getEnquiry 실행하여 db에 저장되어있는 문의 가져오기.
  useEffect(() => {
    getEnquiry();
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
                {" "}
                {/* h1부터 끝까지 div로 묶어줌 */}
                <h2 className="qna_main_title">QnA</h2>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="title">문의 제목:</label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input-field"
                    placeholder="제목을 입력하세요"
                  />
                  <br />
                  <label htmlFor="content">문의 내용:</label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="input-field-view"
                    placeholder="내용을 입력하세요"
                  />
                  <br />
                  <button type="submit" className="submit-button">
                    등록하기
                  </button>
                </form>
                <div className="question-list">
                  <h2>등록된 문의</h2>

                  {questions.length === 0 ? (
                    <p>등록된 문의가 없습니다.</p>
                  ) : (
                    questions.map((question, index) => (
                      <QuestionItem
                        key={index}
                        question={question}
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
