import React from 'react';
import './ProductDetail.css';

const ProductDetail = ({ product, onClose, onAddToCart, onBuyNow }) => {
  if (!product) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="product-detail-overlay" onClick={onClose}>
      <div className="product-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="product-detail-close" onClick={onClose}>
          &times;
        </button>

        <div className="product-detail-content">
          <div className="product-detail-image">
            <img src={product.image} alt={product.title} />
            {product.outOfStock && (
              <div className="product-detail-badge">OUT OF STOCK</div>
            )}
          </div>

          <div className="product-detail-info">
            <h2 className="product-detail-title">{product.title}</h2>
            
            <div className="product-detail-price">
              {formatPrice(product.price)}
            </div>

            <div className="product-detail-category">
              <span className="detail-label">Category:</span>
              <span className="detail-value">{product.category}</span>
            </div>

            <div className="product-detail-status">
              <span className="detail-label">Status:</span>
              <span className={`detail-value status-${product.status}`}>
                {product.status === 'available' ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <div className="product-detail-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-detail-features">
              <h3>Features</h3>
              <ul>
                <li>High quality materials</li>
                <li>Fast shipping available</li>
                <li>30-day return policy</li>
                <li>1-year warranty included</li>
              </ul>
            </div>

            <div className="product-detail-actions">
              <button 
                className="btn-add-to-cart"
                onClick={() => onAddToCart(product.id)}
                disabled={product.outOfStock}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 18.3333C8.05 18.3333 8.5 17.8837 8.5 17.3333C8.5 16.7829 8.05 16.3333 7.5 16.3333C6.95 16.3333 6.5 16.7829 6.5 17.3333C6.5 17.8837 6.95 18.3333 7.5 18.3333Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M16.5 18.3333C17.05 18.3333 17.5 17.8837 17.5 17.3333C17.5 16.7829 17.05 16.3333 16.5 16.3333C15.95 16.3333 15.5 16.7829 15.5 17.3333C15.5 17.8837 15.95 18.3333 16.5 18.3333Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M2.917 2.917H4.583L6.25 13.75H15.833L17.5 6.25H5.833" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                Add to Cart
              </button>
              
              <button 
                className="btn-buy-now"
                onClick={() => onBuyNow(product.id)}
                disabled={product.outOfStock}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M16.667 5L7.5 14.167L3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
