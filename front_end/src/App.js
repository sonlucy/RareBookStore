import "./styled/App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { LoginProvider } from "./components/LoginContext";
import Address from "./pages/Address";
import BuyDetail from "./pages/BuyDetail";
import CategoryBookList from "./pages/CategoryBookLIst";
import IDPWLogin from "./pages/IDPWLogin";
import Main from "./pages/Main";
import Mypage from "./pages/Mypage";
import Purchase from "./pages/Purchase";
import PurchaseHistory from "./pages/PurchaseHistory";
import RegRequest from "./pages/RegRequest";
import SalesHistory from "./pages/SalesHistory";
import SellerInfoPage from "./pages/SellerInfoPage";
import SignUpEasy from "./pages/SignUpEasy";
import SignUpMail from "./pages/SignUpMail";
import SNSLogin from "./pages/SNSLogin";
import Admin from "./pages/Admin";
import QuestionForm from "./pages/QuestionForm";
import AdminLogin from "./pages/AdminLogin";
import Profile from "./pages/Profile";
import PurchaseReview from "./pages/PurchaseReview";
import SellBook from "./pages/SellBook";
import XNotFound from "./pages/XNotFound";
import Rank from "./pages/Rank";

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 이동 후 화면의 상단으로 스크롤 이동
  }, [location.pathname]); // path 바낄때마다 실행
  
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap"
      ></link>
      <LoginProvider>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="Address" element={<Address />}></Route>
          <Route path="BuyDetail/:itemBuyKey" element={<BuyDetail />}></Route>
          <Route
            path="CategoryBookList/:category"
            element={<CategoryBookList />}
          ></Route>
          <Route path="IDPWLogin" element={<IDPWLogin />}></Route>
          <Route path="AdminLogin" element={<AdminLogin />}></Route>
          <Route path="Mypage" element={<Mypage />}></Route>
          <Route path="/Purchase/:itemBuyKey" element={<Purchase />}></Route>
          <Route
            path="/Mypage/PurchaseHistory"
            element={<PurchaseHistory />}
          ></Route>
          <Route path="/Mypage/RegRequest" element={<RegRequest />}></Route>
          <Route path="/Mypage/SalesHistory" element={<SalesHistory />}></Route>
          <Route path="SellerInfoPage" element={<SellerInfoPage />}></Route>
          <Route path="SignUpEasy" element={<SignUpEasy />}></Route>
          <Route path="SignUpMail" element={<SignUpMail />}></Route>
          <Route path="SNSLogin" element={<SNSLogin />}></Route>
          <Route path="Admin" element={<Admin />}></Route>
          <Route path="QuestionForm" element={<QuestionForm />}></Route>
          <Route path="/Mypage/Profile" element={<Profile />}></Route>
          <Route
            path="/Mypage/PurchaseReview/:itemKey"
            element={<PurchaseReview />}
          ></Route>
          <Route path="SellBook/:itemBuyKey" element={<SellBook />}></Route>
          <Route path="/Mypage/Rank" element={<Rank />}></Route>
          <Route path="*" element={<XNotFound />}></Route>{" "}
          {/* Not Found 페이지 */}
        </Routes>
      </LoginProvider>
    </div>
  );
}

export default App;
