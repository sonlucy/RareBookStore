import Header from "../components/Header";
import Footer from "../components/Footer";
import PurchaseReqForm from "../components/PurchaseReqForm";
import PurchaseReqListOngoing from "../components/PurchaseReqListOngoing";
import PurchaseReqListEnd from "../components/PurchaseReqListEnd";
import SalesHistoryList from "../components/SalesHistoryList";
import MyPageSide from "../components/MypageSide";

const purchaseRequests = [
  {
    title: "Book 1",
    info: "모건 하우절|문학동네",
    image: "img/book.png",
    damage: "상",
    price: "11,000",
    expiry: "2020-12-12",
    aucStatus: true,
  },
  {
    title: "Book 2",
    info: "모건 하우절|문학동네",
    image: "img/book.png",
    damage: "상",
    price: "12,000",
    expiry: "2020-12-12",
    aucStatus: false,
  },
];

function RegRequest() {
  return (
    <div className="App">
      <Header />
      <div style={{ display: "flex" }}>
        {" "}
        {/* 옆에 붙이기 */}
        <MyPageSide />
        <PurchaseReqForm />
      </div>
      {/* 배열을 넘겨주는 방법. */}
      <PurchaseReqListOngoing requests={purchaseRequests} />{" "}
      {/* 페이지에 따라 하나만 써야함 */}
      <PurchaseReqListEnd requests={purchaseRequests} /> {/* 버튼 없는 버전 */}
      {/* 개별로 넘겨주는 방법 */}
      {/*       <PurchaseReqListOngoing title="폴링인 폴" info="모건 하우절|문학동네" image="img/book.png"/>
        <PurchaseReqListEnd title="폴링인 폴" info="모건 하우절|문학동네" image="img/book.png" /> */}
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default RegRequest;
