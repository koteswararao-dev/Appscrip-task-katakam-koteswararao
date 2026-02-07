import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ onSearch, onCartClick, onFilterToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="header">
      {/* Promotional Banner */}
      <div className="promo-banner">
        <p>Welcome to RRStore - Free Shipping on Orders Over $50!</p>
      </div>

      {/* Main Header */}
      <div className="header-main">
        {/* Top Row: Logo and Actions */}
        <div className="header-top-row">
          <div className="header-container-top">
            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn"
              aria-label="Toggle menu"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <span className="hamburger"></span>
              <span className="hamburger"></span>
              <span className="hamburger"></span>
            </button>

            {/* Logo - Centered */}
            <Link to="/" className="logo logo-centered">
              <span className="logo-icon">RR</span>
              <span className="logo-text">STORE</span>
            </Link>

            {/* Header Actions - Right Side */}
            <div className="header-actions">
              {/* Search Icon Button (No Input on Desktop) */}
              <button 
                type="button" 
                className="icon-btn search-icon-btn" 
                aria-label="Search"
                onClick={() => {
                  // Show search on mobile or implement search modal
                  const searchInput = document.querySelector('.search-input-mobile');
                  if (searchInput) {
                    searchInput.focus();
                  }
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M19 19L13 13M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Search Input - Hidden on Desktop, Visible on Mobile */}
              <form className="search-form search-form-mobile" onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  className="search-input search-input-mobile"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  aria-label="Search products"
                />
                <button type="submit" className="search-btn" aria-label="Search">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M19 19L13 13M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>

              {/* Wishlist Icon */}
              <button className="icon-btn" aria-label="Wishlist">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M17.3666 3.84172C16.941 3.41589 16.4357 3.0781 15.8796 2.84763C15.3236 2.61716 14.7271 2.49854 14.1249 2.49854C13.5228 2.49854 12.9263 2.61716 12.3702 2.84763C11.8142 3.0781 11.3089 3.41589 10.8833 3.84172L9.99998 4.72506L9.11665 3.84172C8.25832 2.98339 7.09165 2.49898 5.87498 2.49898C4.65832 2.49898 3.49165 2.98339 2.63332 3.84172C1.77498 4.70006 1.29065 5.86672 1.29065 7.08339C1.29065 8.30006 1.77498 9.46672 2.63332 10.3251L3.51665 11.2084L9.99998 17.6917L16.4833 11.2084L17.3666 10.3251C17.7925 9.89947 18.1303 9.39417 18.3607 8.83811C18.5912 8.28205 18.7098 7.68556 18.7098 7.08339C18.7098 6.48122 18.5912 5.88473 18.3607 5.32867C18.1303 4.77261 17.7925 4.26731 17.3666 3.84172Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Cart Icon */}
              <button className="icon-btn cart-btn" aria-label="Shopping cart" onClick={onCartClick}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.49998 18.3333C8.05036 18.3333 8.49998 17.8837 8.49998 17.3333C8.49998 16.7829 8.05036 16.3333 7.49998 16.3333C6.9496 16.3333 6.49998 16.7829 6.49998 17.3333C6.49998 17.8837 6.9496 18.3333 7.49998 18.3333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.5 18.3333C17.0504 18.3333 17.5 17.8837 17.5 17.3333C17.5 16.7829 17.0504 16.3333 16.5 16.3333C15.9496 16.3333 15.5 16.7829 15.5 17.3333C15.5 17.8837 15.9496 18.3333 16.5 18.3333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2.91666 2.91666H4.58333L6.24999 13.75H15.8333L17.5 6.24999H5.83333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* User Icon */}
              <button className="icon-btn" aria-label="User account">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 10C12.3012 10 14.1667 8.13452 14.1667 5.83333C14.1667 3.53215 12.3012 1.66667 10 1.66667C7.69881 1.66667 5.83333 3.53215 5.83333 5.83333C5.83333 8.13452 7.69881 10 10 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.1583 18.3333C17.1583 15.1083 13.95 12.5 9.99999 12.5C6.04999 12.5 2.84166 15.1083 2.84166 18.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Language Selector */}
              <select className="language-select" aria-label="Select language">
                <option value="eng">ENG</option>
                <option value="es">ESP</option>
                <option value="fr">FR</option>
              </select>

              {/* Filter Icon Button - Mobile Only */}
              <button 
                className="icon-btn filter-icon-btn" 
                aria-label="Toggle filters"
                onClick={() => {
                  if (onFilterToggle) {
                    onFilterToggle();
                  }
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M2.5 5H17.5M5 10H15M7.5 15H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Row - Centered */}
        <div className="header-nav-row">
          <div className="header-container-nav">
            <nav className="desktop-nav" aria-label="Main navigation">
              <Link to="/shop" className={location.pathname === '/' || location.pathname === '/shop' ? 'active' : ''}>SHOP</Link>
              <Link to="/skills" className={location.pathname === '/skills' ? 'active' : ''}>SKILLS</Link>
              <Link to="/stories" className={location.pathname === '/stories' ? 'active' : ''}>STORIES</Link>
              <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>ABOUT</Link>
              <Link to="/contact-us" className={location.pathname === '/contact' || location.pathname === '/contact-us' ? 'active' : ''}>CONTACT US</Link>
            </nav>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className={`mobile-nav ${showMobileMenu ? 'active' : ''}`} aria-label="Mobile navigation">
          <Link to="/shop" onClick={() => setShowMobileMenu(false)}>SHOP</Link>
          <Link to="/skills" onClick={() => setShowMobileMenu(false)}>SKILLS</Link>
          <Link to="/stories" onClick={() => setShowMobileMenu(false)}>STORIES</Link>
          <Link to="/about" onClick={() => setShowMobileMenu(false)}>ABOUT</Link>
          <Link to="/contact-us" onClick={() => setShowMobileMenu(false)}>CONTACT US</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

