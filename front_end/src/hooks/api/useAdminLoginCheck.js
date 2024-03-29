import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAdminLoginCheck = () => {
  const [adminUserData, setAdminUserData] = useState({
    userid: "",
    userpwd: "",
  });
  const navigate = useNavigate();
  const adminloginCheck = async () => {
    try {
      const res = await fetch("/api/adminloginCheck", {
        method: "POST",
        body: JSON.stringify(adminUserData),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      alert(data);
      console.log(data);
      if (res.status === 200) {
        navigate("/Admin");
      } else {
        setAdminUserData({ userid: "", userpwd: "" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { adminUserData, setAdminUserData, adminloginCheck };
};

export default useAdminLoginCheck;
