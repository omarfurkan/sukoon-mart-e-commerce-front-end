import React from 'react';
import Navbar from '../features/navbar/Navbar';
import ProductDetail from '../features/product/ProductDetail';

const ProductDetailPage = () => {
    return (
        <Navbar>
            <ProductDetail />
        </Navbar>
    );
};

export default ProductDetailPage;