import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styled/SellerInfo.css";
import SellerInfo from "../components/SellerInfo";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const calculateGrade = (point) => {
  if (point >= 4.5) {
    return "1";
  } else if (point >= 3.5) {
    return "2";
  } else if (point >= 2.5) {
    return "3";
  } else if (point >= 1.5) {
    return "4";
  } else {
    return "5";
  }
};

function SellerInfoPage() {
  const [sellerInfo, setSellerInfo] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const custKey = location.state.custKey;
    if (custKey) {
      axios.get(`http://localhost:3001/customers/${custKey}`)
        .then(response => {
          const customer = response.data;


          // 판매자 정보 설정
          const sellerData = {
            sellerName: customer.nickname,
            grade: customer.grade, 
            point: customer.point, 
            reviews: [], // 리뷰 정보를 가져올 배열
            itemSellKeys: [], // 판매자가 판매하고 있는 상품 키를 가져올 배열
          };

          // 판매 희망 책 조회
          axios.get(`http://localhost:3001/sellerbook/seller/${custKey}`)
            .then(sellerBookResponse => {
              const sellerBooks = sellerBookResponse.data;
              const itemSellKeys = sellerBooks.map(book => book.itemSellKey);
              sellerData.itemSellKeys = itemSellKeys; // 판매자가 판매하고 있는 상품 키 저장

              // 리뷰 가져오기
              axios.get(`http://localhost:3001/reviews/seller/${custKey}`)
                .then(reviewsResponse => {
                  const reviews = reviewsResponse.data;
                  //console.log(reviews)
                  let point = 0;
                  if (reviews.length > 0) {
                    const totalSatisfaction = reviews.reduce((sum, review) => sum + review.satisfaction, 0);
                    const totalRepurchase = reviews.reduce((sum, review) => sum + review.repurchase, 0);
                    const avgSatisfaction = totalSatisfaction / reviews.length;
                    const avgRepurchase = totalRepurchase / reviews.length;
                    point = ((avgSatisfaction + avgRepurchase) / 2).toFixed(1); // 소수점 한자리까지
                  }
                  //console.log(point)
                  const grade = calculateGrade(point);

                  const handleUpdate = () => {
                    axios.put(`http://localhost:3001/updateCustomerPoint/${custKey}`, { grade, point })
                      .then(response => {
                        console.log('업데이트 성공:', response.data); // 업데이트 성공 시 메시지 출력
                      })
                      .catch(error => {
                        console.error('업데이트 실패:', error);
                      });
                  };


                  const promises = reviews.map(review => {
                    // 리뷰 작성자의 닉네임 가져오기
                    return axios.get(`http://localhost:3001/customers/${review.custKey}`)
                      .then(customerResponse => {
                        const customer = customerResponse.data;
                        return {
                          buyerName: customer.nickname,
                          review: review.review
                        };
                      })
                      .catch(error => {
                        console.error('Error fetching reviewer info:', error);
                        return null;
                      });
                  });
                  // 모든 프로미스가 완료될 때까지 기다린 후에 판매자 정보 업데이트
                  Promise.all(promises)
                    .then(reviewers => {
                      handleUpdate();
                      sellerData.reviews = reviewers; // 리뷰내용, 리뷰어 닉네임
                      setSellerInfo([sellerData]); // 판매자 정보 업데이트
                    });
                })
                .catch(error => {
                  console.error('reviews ERR:', error);
                });
            })
            .catch(error => {
              console.error('seller books ERR:', error);
            });

        })
        .catch(error => {
          console.error('seller info ERR:', error);
        });
    }
  }, [location.state.custKey]); // 상태 변경 할때마다 렌더링

  return (
    <>
      <div className="height-container">
        <Header />
        <SellerInfo sellerInfoList={sellerInfo} />
      </div>
      <Footer />
    </>
  );
}

export default SellerInfoPage;
