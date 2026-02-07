import React, { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onWishlistToggle, isWishlisted, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (onWishlistToggle) {
      onWishlistToggle(product.id);
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(product);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <article 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.title ? `${product.title} - Product Image` : 'Product image - E-commerce product listing'}
          className="product-image"
          loading="lazy"
          title={product.title || 'View product details'}
        />
        {product.isNew && (
          <span className="product-badge new-badge">NEW PRODUCT</span>
        )}
        {product.outOfStock && (
          <span className="product-badge stock-badge">OUT OF STOCK</span>
        )}
        {isHovered && (
          <button className="quick-view-btn" aria-label="Quick view" onClick={handleCardClick}>
            View Details
          </button>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-title">
          {product.title || 'Product Name'}
        </h3>
        <p className="product-description">
          {product.description 
            ? product.description.substring(0, 50) + '...'
            : 'Lorem ipsum dolor sit amet, consectetur.'}
        </p>
        <div className="product-footer">
          <div className="product-price">
            {product.price ? (
              formatPrice(product.price)
            ) : (
              <span className="price-placeholder">
                Sign in or Create an account to see pricing
              </span>
            )}
          </div>
          <button
            className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
            onClick={handleWishlistClick}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={isWishlisted}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M17.3666 3.84172C16.941 3.41589 16.4357 3.0781 15.8796 2.84763C15.3236 2.61716 14.7271 2.49854 14.1249 2.49854C13.5228 2.49854 12.9263 2.61716 12.3702 2.84763C11.8142 3.0781 11.3089 3.41589 10.8833 3.84172L9.99998 4.72506L9.11665 3.84172C8.25832 2.98339 7.09165 2.49898 5.87498 2.49898C4.65832 2.49898 3.49165 2.98339 2.63332 3.84172C1.77498 4.70006 1.29065 5.86672 1.29065 7.08339C1.29065 8.30006 1.77498 9.46672 2.63332 10.3251L3.51665 11.2084L9.99998 17.6917L16.4833 11.2084L17.3666 10.3251C17.7925 9.89947 18.1303 9.39417 18.3607 8.83811C18.5912 8.28205 18.7098 7.68556 18.7098 7.08339C18.7098 6.48122 18.5912 5.88473 18.3607 5.32867C18.1303 4.77261 17.7925 4.26731 17.3666 3.84172Z"
                fill={isWishlisted ? '#ff0000' : 'none'}
                stroke={isWishlisted ? '#ff0000' : 'currentColor'}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

