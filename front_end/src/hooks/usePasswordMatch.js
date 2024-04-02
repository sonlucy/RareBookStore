import { useState, useEffect } from 'react';

const usePasswordMatch = (password, checkPassword) => {
  const [match, setMatch] = useState(null);

  useEffect(() => {
    if (password === checkPassword) {
      setMatch(true);
    } else {
      setMatch(false);
    }
  }, [password, checkPassword]);

  return match;
};

export default usePasswordMatch;