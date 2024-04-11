import { useState, useEffect } from "react";
import axios from "axios";

const useBookDataByItemSellKey = (itemSellKey) => {
  const [bookData, setBookData] = useState("");

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/sellerbook/orders/${itemSellKey}`
        );
        setBookData(response.data[0]);
      } catch (error) {
        console.error("Error fetching seller nickname:", error);
      }
    };

    if (itemSellKey) {
      fetchBookData();
    }
  }, [itemSellKey]);

  return bookData;
};

export default useBookDataByItemSellKey;
