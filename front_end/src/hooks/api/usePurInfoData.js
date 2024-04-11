import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const usePurInfoData = () => {
  const { itemSellKey } = useParams();
  const itemSellKeyValue = parseInt(itemSellKey, 10); // 문자열을 정수로 변환  
  console.log("usePurInfoData itemSellKey useParams 확인", itemSellKey);
  // const [sellerData, setSellerData] = useState([]);
  const [sellerData, setSellerData] = useState(null); // 초기에 null로 설정
  const [bookData, setBookData] = useState({  // useState를 객체로 초기화하여 사용
    itemImg: '',
    itemTitle: '',
    author: '',
    publisher: '',
    seller: '',     // sellerbook 테이블
    sellerKey: '',  // sellerbook 테이블
    itemBuyKey: '',
    itemSellKey: '', // sellerbook 테이블
  });

  useEffect(() => {
    fetchSellerData();
  }, []);

  // useEffect 훅 내에서 itemSellKey를 확인하여 값이 존재하고 undefined가 아닌 경우에만 fetchSellerData를 호출
  useEffect(() => {
    if (sellerData) {
      fetchBookData(sellerData.itemBuyKey);
    }
  }, [sellerData]);

  // 특정 itemSellKey를 통한 조회
  const fetchSellerData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/sellerbook/item/sell/${itemSellKeyValue}`
      );
      const data = response.data[0];

      setSellerData(data);
      /*  custKey: 3
          damage: 2
          dateEnroll: "2024-04-08T15:00:00.000Z"
          itemBuyKey: 11
          itemSellKey: 3
          price: 12000
          sellerKey: 1 //판매자의 custKey   */

      // sellerInfo에서 가져온 itemBuyKey를 fetchBookData 함수에 전달
      fetchBookData(data.itemBuyKey);

    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  // 특정 구매 희망 도서 조회 (Read)
  const fetchBookData = async (itemBuyKey) => {
    try {
      const response = await axios.get(`http://localhost:3001/buyerbook/item/${itemBuyKey}`);
      const data = response.data[0];  // 응답 데이터 배열에서 첫 번째 요소만을 가져와서 변수 data에 저장
      // const data = response.data;  // 응답 데이터 자체를 그대로 변수 data에 저장
      const sellerNickname = await getSellerNickname(data.custKey);
      setBookData({
        itemImg: data.itemImg,
        itemTitle: data.itemTitle,
        author: data.author,
        publisher: data.publisher,
        seller: sellerNickname,
        sellerKey: data.custKey,
        itemBuyKey: data.itemBuyKey,
        itemSellKey: itemSellKeyValue,
      });
      /*
      author: "백난도"
      itemBuyKey: 4
      itemImg: "https://shopping-phinf.pstatic.net/main_4444820/44448204620.20231206091808.jpg"
      itemSellKey: 3
      itemTitle: "흔한남매 15"
      publisher: "미래엔아이세움"
      seller: "testcocomoo"
      sellerKey: 1
      */
    } catch (error) {
      console.error('Error fetching book data:', error);
    }
  };

  const getSellerNickname = async (custKey) => {
    try {
      const response = await axios.get(`http://localhost:3001/customers/${custKey}`);
      return response.data.nickname;
    } catch (error) {
      console.error('Error fetching seller nickname:', error);
      return '';
    }
  };
  
  return { bookData, sellerData }; // 외부에서 bookData와 sellerData를 사용할 수 있도록 반환

}

export default usePurInfoData;