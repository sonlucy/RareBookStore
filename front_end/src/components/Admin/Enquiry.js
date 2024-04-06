import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styled/Enquiry.css';

function Enquiry() {
  const [enquiries, setEnquiries] = useState([]);
  
  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await axios.get('http://localhost:3001/enquiries'); 
      setEnquiries(response.data); 
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    }
  };

  const [showReplies, setShowReplies] = useState({});

  const toggleReplies = (id) => {
    setShowReplies({
      ...showReplies,
      [id]: !showReplies[id]
    });
  };

  const handleReplySubmit = async (boardKey, replyText) => {
    try {
      await axios.post('http://localhost:3001/reply', {
        boardKey: boardKey,
        reply: replyText
      });
      console.log(`문의 ${boardKey}에 대한 답글을 성공적으로 전송했습니다.`);
      // 답글 전송 후 재요청하여 최신 데이터로 갱신
      fetchEnquiries();
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

  const fetchReplies = async (boardKey) => {
    try {
      const response = await axios.get(`http://localhost:3001/reply/${boardKey}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching replies:', error);
      return [];
    }
  };

  return (
    <div className='jyh-table'>
      <p className='jyh-tb-title'>문의 내용</p>
      <table className='jyh-enquiry-table'>
        <tbody>
          {enquiries.map(enquiry => (
            <React.Fragment key={enquiry.boardKey}>
              <tr>
                <td>{enquiry.boardKey}</td>
                <td>{enquiry.boardTitle}</td>
                <td>{enquiry.date}</td>
                <td>
                  <button className='jyh-enquiry-res' onClick={() => toggleReplies(enquiry.boardKey)}>
                    {showReplies[enquiry.boardKey] ? '닫기' : '답글'}
                  </button>
                </td>
              </tr>
              {showReplies[enquiry.boardKey] && (
                <tr>
                  <td colSpan="4" className='jyh-enquiry-detail'>
                    {enquiry.Enquiry}
                    <form onSubmit={(e) => {e.preventDefault(); handleReplySubmit(enquiry.boardKey, e.target.reply.value)}}>
                      <textarea className='jyh-replyarea' name="reply" placeholder="답글을 입력하세요" required></textarea>
                      <button type="submit">등록</button>
                    </form>
                    {/* 해당 질문에 대한 답변을 매핑하여 표시 */}
                    <QuestionReplies boardKey={enquiry.boardKey} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// QuestionReplies 컴포넌트는 boardKey를 받아 해당 문의에 대한 답변을 표시합니다.
function QuestionReplies({ boardKey }) {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    fetchReplies();
  }, [boardKey]);

  const fetchReplies = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/reply/${boardKey}`);
      setReplies(response.data);
    } catch (error) {
      console.error('Error fetching replies:', error);
      setReplies([]); // 에러 발생 시 빈 배열로 설정
    }
  };

  return (
    <div>
      {/* 답변을 매핑하여 표시 */}
      {Array.isArray(replies) && replies.length > 0 ? (
        replies.map((reply) => (
          <div key={reply.replyKey}>
            <p>{reply.reply}</p>
          </div>
        ))
      ) : (
        <p>답변이 없습니다.</p>
      )}
    </div>
  );
}

export default Enquiry;
