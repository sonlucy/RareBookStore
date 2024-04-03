import React from 'react';
import PurchaseBanner from '../components/PurchaseBanner';
import ReviewCreate from '../components/ReviewCreate';
import Header from '../components/Header';
import MyPageSide from '../components/MypageSide';
import Footer from '../components/Footer';

function PurchaseReview(props) {
    return (
        <>
            <div className="height-container">
                <Header />
                <div className="yhw_container">
                    <div className="yhw_purHistCont">
                        <div className="yhw_MypageSideAdd">
                            <MyPageSide />
                        </div>
                        <div className="yhw_purHistMainCont">
                            <div>
                                <PurchaseBanner />
                                <ReviewCreate />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default PurchaseReview;