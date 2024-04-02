import React from 'react';
import styled from 'styled-components';
import PurchaseBanner from '../components/PurchaseBanner';
import ReviewCreate from '../components/ReviewCreate';
import Header from '../components/Header';
import Footer from '../components/Footer';

function PurchaseReview(props) {
    return (
        <div>
            <Header />
            <PurchaseBanner />
            <ReviewCreate />
            <Footer />
        </div>
    );
}

export default PurchaseReview;