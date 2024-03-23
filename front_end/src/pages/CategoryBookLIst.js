import React from 'react';
import CategoryBanner from '../components/CategoryBanner';
import ProductList from '../components/ProductList';
import styled from 'styled-components';

function CategoryBookLIst(props) {
    return (
        <div>
            <CategoryBanner />
            <ProductList />
            <ProductList />
            <ProductList />
            <ProductList />
            <ProductList />
        </div>
    );
}

export default CategoryBookLIst;