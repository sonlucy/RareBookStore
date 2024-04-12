import { useEffect, useState, useContext } from 'react';
import { LoginContext } from "../../components/LoginContext";
import usePurInfoData from "./usePurInfoData"; // usePurInfoData 훅 임포트
import axios from 'axios';

const useUserAddr = () => {
  const { loginUser } = useContext(LoginContext);
  const { bookData, sellerData } = usePurInfoData();  // usePurInfoData 훅을 호출하여 bookData 상태와 데이터 가져오는 로직 사용
  // const [user, setUser] = useState([]);   // 사용자 정보
  const [userAddr, setUserAddr] = useState({ // input에 입력한 주소
    name: '',
    tel: '',
    postcode: '',
    addr: '',
    addrDetail: '',
  });
  const [getAddr, setGetAddr] = useState([]);   // 기본 배송지 주소
  // (==> userAddr와 getAddr가 동일하지만, DestForm에서 주소목록 출력 시 다르게 설정해야 하기 때문에 Addr 두 개로 받음)
  // console.log("user 데이터", user);
  /*  age: 
      contact: null
      custKey: 1
      email: "testcocomoo@gmail.com"
      gender: "F"
      grade: 5
      nickname: "testcocomoo"
      point: "0.0"
      userid: "asd123"
      userpwd:    */
  console.log("userAddr 데이터", userAddr);
  console.log("getAddr 데이터", getAddr);

  useEffect(() => {
    // 특정 고객의 주소 조회
    const fetchAddrData = async () => {
      try {
        const addrResponse = await axios.get(
          `http://localhost:3001/address/${loginUser}`  // loginUser = custKey
        );
        setGetAddr(addrResponse.data);
      } catch (error) {
        console.error("고객의 주소를 가져올수 없습니다.", error);
      }
    };

    fetchAddrData();

  }, [loginUser]);

  // 구매하기 버튼 클릭 시 order 테이블에 데이터 저장하는 함수
  const handlePurBtnClick = async () => {
    try {
      let selectedAddress = getAddr.find(address => address.defaultAddr === 'Y');
      if (!selectedAddress) {
        selectedAddress = userAddr;
      }

      const response = await fetch("/orders", {
        method: "POST",
        body: JSON.stringify({
          itemKey: bookData.itemBuyKey,
          itemSellKey: bookData.itemSellKey,
          custKey: loginUser,
          sellerKey: bookData.sellerKey,
          price: sellerData ? sellerData.price : '',
          name: selectedAddress.name,
          tel: selectedAddress.tel,
          postcode: selectedAddress.postcode,
          addr: selectedAddress.addr,
          addrDetail: selectedAddress.addrDetail,
          dateBuy: new Date().toISOString().split('T')[0],
        }),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Response:', data);

      // 여기까지 성공 !!!!!!!!
      // order 테이블에 저장된 후에 작업 수행 ==> ???
      // aucStat 값 2(==낙찰)로 변경 ==> status
    } catch (error) {
      console.error('Error placing order:', error);
      // 에러 처리
    }
  };

  useEffect(() => {
    //???
  }, [userAddr]);

  return { userAddr, setUserAddr, getAddr, setGetAddr, handlePurBtnClick };
};

export default useUserAddr;