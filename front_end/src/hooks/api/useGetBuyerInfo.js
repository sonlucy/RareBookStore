import { useState, useEffect } from "react";
import { serverURL } from "../../config";
import axios from "axios";

const useGetBuyerInfo = (itemBuyKey) => {
  const [buyerInfo, setBuyerInfo] = useState("");

  useEffect(() => {
    const fetchBuyerInfo = async () => {
      try {
        const response = await axios.get(
          `${serverURL}/buyerbook/item/${itemBuyKey}`
        );
        setBuyerInfo(response.data[0].custKey);
        // console.log(response.data.custKey);
      } catch (error) {
        console.error("구매자 정보 가져오기 오류:", error);
      }
    };

    if (itemBuyKey) {
      fetchBuyerInfo();
    }
  }, [itemBuyKey]);

  return buyerInfo;
};

export default useGetBuyerInfo;
