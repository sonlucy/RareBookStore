import { useState, useEffect } from "react";
import axios from 'axios';

const usePurInfoData = () => {
  const [bookData, setBookData] = useState({
    itemImg: '',
    itemTitle: '',
    author: '',
    publisher: '',
    seller: '',
    sellerKey: '',
    itemBuyKey: '',
  });

  useEffect(() => {
    fetchBookData();
  }, []);

  const fetchBookData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/buyerbook');
      const data = response.data[0];
      const sellerNickname = await getSellerNickname(data.custKey);
      setBookData({ // 가져온 데이터를 상태로 설정
        itemImg: data.itemImg,
        itemTitle: data.itemTitle,
        author: data.author,
        publisher: data.publisher,
        seller: sellerNickname,
        sellerKey: data.custKey, //판매자의 custKey 추가
        itemBuyKey: data.itemBuyKey,
      });
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
  
  return { bookData, fetchBookData }; // 외부에서 bookData와 fetchBookData를 사용할 수 있도록 반환

}

export default usePurInfoData;