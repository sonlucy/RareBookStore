import { useState, useEffect } from "react";
import axios from "axios";

const useBuyerInformation = (itemBuyKey) => {
  const [buyerInfo, setBuyerInfo] = useState("");

  useEffect(() => {
    const fetchBuyerInformation = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/buyerbook/item/${itemBuyKey}`
        );
        setBuyerInfo(response.data[0]);
        // console.log(response.data.custKey);
      } catch (error) {
        console.error("구매자 정보 가져오기 오류:", error);
      }
    };

    if (itemBuyKey) {
      fetchBuyerInformation();
    }
  }, [itemBuyKey]);

  return buyerInfo;
};

export default useBuyerInformation;
