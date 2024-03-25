import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SellBookInfo from '../components/SellBookInfo';
import BookSaleBid from '../components/BookSaleBid';

function SellBook(props) {
    return (
        <>
        <Header />
        <div>
            <SellBookInfo></SellBookInfo>
            <BookSaleBid></BookSaleBid>
        </div>
        <Footer />
        </>
    );
}

export default SellBook;