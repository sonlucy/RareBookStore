import { useState } from "react";

const useNicknameCheck = () => {
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false);
  const [error, setError] = useState(null);

  const checkNicknameDuplicate = async (nickname) => {
    try {
      const response = await fetch("/api/checkNicknameDuplicate", {
        method: "POST",
        body: JSON.stringify({ nickname }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.status === 200) {
        // User ID is not duplicated
        setIsNicknameDuplicate(false);
        // console.log("사용가능한 닉네임입니다.");
        alert(data);
      } else {
        // User ID is duplicated
        setIsNicknameDuplicate(true);
        // console.log("사용 불가능한 닉네임입니다.");
        alert(data);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      setIsNicknameDuplicate(false); // Assume user ID is not duplicated
      setError(error);
    }
  };

  return {
    isNicknameDuplicate,
    setIsNicknameDuplicate,
    checkNicknameDuplicate,
  };
};

export default useNicknameCheck;
