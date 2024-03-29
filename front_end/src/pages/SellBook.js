import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SellBookInfo from '../components/SellBookInfo';
import BookSaleBid from '../components/BookSaleBid';

function SellBook(props) {
    return (
    <>
    <div className="height-container">
        <Header />
        <div>
            <SellBookInfo></SellBookInfo>
            <BookSaleBid></BookSaleBid>
        </div>
        </div>
        <Footer />
    </>
    );
}

export default SellBook;