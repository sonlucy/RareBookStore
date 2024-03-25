import React from 'react';
import styled from 'styled-components';
import PurchaseBanner from '../components/PurchaseBanner';
import ReviewCreate from '../components/ReviewCreate';

function PurchaseReview(props) {
    return (
        <div>
            <PurchaseBanner />
            <ReviewCreate />
        </div>
    );
}

export default PurchaseReview;