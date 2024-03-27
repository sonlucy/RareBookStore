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
        console.log("사용가능한 이메일입니다.");
      } else {
        // Email is duplicated
        setIsDuplicate(true);
        console.log("사용 불가능한 이메일입니다.");
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
