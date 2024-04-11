import { useState, useEffect } from "react";
import axios from "axios";

const useGetReviews = (itemKey) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/reviews/item/${itemKey}`
        );
        setReviews(response.data[0]);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (itemKey) {
      fetchReviews();
    }
  }, [itemKey]);

  return { reviews };
};

export default useGetReviews;
