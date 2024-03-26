//이메일 중복체크
import { useState } from "react";

const useEmailCheck = () => {
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [error, setError] = useState(null);

  const checkEmailDuplicate = async (email) => {
    try {
      const response = await fetch("/api/checkEmailDuplicate", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.status === 200) {
        // Email is not duplicated
        setIsDuplicate(false);
      } else {
        // Email is duplicated
        setIsDuplicate(true);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      setIsDuplicate(false); // Assume email is not duplicated
      setError(error);
    }
  };

  return { isDuplicate, error, checkEmailDuplicate };
};

export default useEmailCheck;
