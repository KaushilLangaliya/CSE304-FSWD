import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductImageSection from '../components/ProductImageSection';
import ProductInfoSection from '../components/ProductInfoSection';

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  console.log('ProductDetail product:', product);

  React.useEffect(() => {
    if (!product) {
      // Redirect to home or shop if no product data found
      navigate('/products');
    }
  }, [product, navigate]);

  if (!product) {
    return null; // or loading spinner
  }

  return (
    <div
      className="product-detail-page"
      style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', padding: '40px' }}
    >
      <ProductImageSection product={product} />
      <ProductInfoSection product={product} />
    </div>
  );
};

export default ProductDetail;
