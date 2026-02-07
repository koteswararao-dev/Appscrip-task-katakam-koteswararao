import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import Filters from './Filters';
import ProductCard from './ProductCard';
import ProductDetail from './ProductDetail';
import './ItemsList.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const ItemsList = ({ token, user, onLogout }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [message, setMessage] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [wishlistedItems, setWishlistedItems] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: [0, 1000],
    customizable: false,
    search: ''
  });
  const [sortBy, setSortBy] = useState('recommended');

  useEffect(() => {
    console.log('Token in ItemsList:', token);
    console.log('User in ItemsList:', user);
  }, [token, user]);

  useEffect(() => {
    fetchItems();
    fetchCartSilent(); // Load cart count on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, filters, sortBy]);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/items`);
      setItems(response.data);
      setFilteredItems(response.data);
    } catch (err) {
      console.error('Error fetching items:', err);
      showMessage('Error loading items');
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...items];

    // Category filter
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(item => 
        item.category?.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Price filter
    if (filters.priceRange) {
      filtered = filtered.filter(item => {
        const price = item.price || 0;
        return price >= filters.priceRange[0] && price <= filters.priceRange[1];
      });
    }

    // Search filter
    if (filters.search && filters.search.trim()) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(item =>
        item.name?.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower) ||
        item.category?.toLowerCase().includes(searchLower)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'newest':
        filtered.reverse();
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // recommended - keep original order
        break;
    }

    setFilteredItems(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  const handleSearch = (query) => {
    setFilters(prev => ({ ...prev, search: query }));
  };

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${API_URL}/carts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(response.data);
      setShowCart(true);
      setShowOrders(false);
    } catch (err) {
      console.error('Fetch cart error:', err.response?.data);
      showMessage(err.response?.data?.message || 'Error fetching cart');
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
      setShowOrders(true);
      setShowCart(false);
    } catch (err) {
      console.error('Fetch orders error:', err.response?.data);
      showMessage(err.response?.data?.message || 'Error fetching orders');
    }
  };

  const addToCart = async (itemId) => {
    try {
      console.log('Adding to cart with token:', token);
      await axios.post(`${API_URL}/carts`, 
        { item_id: itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showMessage('✓ Item added to cart!');
      // Close product detail if open
      setSelectedProduct(null);
      // Refresh cart to update count
      await fetchCartSilent();
    } catch (err) {
      console.error('Add to cart error:', err.response?.data);
      showMessage(err.response?.data?.message || 'Error adding to cart');
    }
  };

  const buyNow = async (itemId) => {
    try {
      // Add to cart
      await axios.post(`${API_URL}/carts`, 
        { item_id: itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Immediately checkout
      await axios.post(`${API_URL}/orders`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      showMessage('✓ Order placed successfully!');
      setSelectedProduct(null);
      setCartItems([]);
    } catch (err) {
      console.error('Buy now error:', err.response?.data);
      showMessage(err.response?.data?.message || 'Error placing order');
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await axios.delete(`${API_URL}/carts/${cartItemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showMessage('✓ Item removed from cart');
      fetchCart(); // Refresh cart
    } catch (err) {
      console.error('Remove from cart error:', err.response?.data);
      showMessage('Error removing item');
    }
  };

  // Fetch cart silently (without opening modal) to update count
  const fetchCartSilent = async () => {
    try {
      const response = await axios.get(`${API_URL}/carts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(response.data);
    } catch (err) {
      console.error('Fetch cart error:', err.response?.data);
    }
  };

  const checkout = async () => {
    try {
      await axios.post(`${API_URL}/orders`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showMessage('✓ Order placed successfully!');
      setCartItems([]);
      setShowCart(false);
    } catch (err) {
      console.error('Checkout error:', err.response?.data);
      showMessage(err.response?.data?.message || 'Error placing order');
    }
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleWishlistToggle = (itemId) => {
    setWishlistedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseProductDetail = () => {
    setSelectedProduct(null);
  };

  // Convert items to product format for ProductCard
  const productsFromItems = filteredItems.map(item => ({
    id: item._id,
    title: item.name,
    description: item.description || `Status: ${item.status}`,
    image: item.image || `https://via.placeholder.com/400x300/667eea/ffffff?text=${encodeURIComponent(item.name)}`,
    price: item.price,
    status: item.status,
    category: item.category,
    isNew: false,
    outOfStock: item.status !== 'available'
  }));

  return (
    <Router>
      <div className="items-app">
        <Header 
          onSearch={handleSearch}
          onCartClick={fetchCart}
          onFilterToggle={handleToggleFilters}
        />

        {message && (
          <div className="alert-banner">
            {message}
          </div>
        )}

        {/* Hero Section */}
        <section className="hero-section">
          <h1 className="hero-title">DISCOVER OUR PRODUCTS</h1>
          <p className="hero-description">
            Browse our exclusive collection at RRStore. Welcome, <strong>{user?.username}</strong>!
          </p>
        </section>

        {/* Action Buttons Bar */}
        <div className="action-bar">
          <div className="action-bar-container">
            <button onClick={fetchCart} className="action-btn cart-btn-action">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 18.3333C8.05 18.3333 8.5 17.8837 8.5 17.3333C8.5 16.7829 8.05 16.3333 7.5 16.3333C6.95 16.3333 6.5 16.7829 6.5 17.3333C6.5 17.8837 6.95 18.3333 7.5 18.3333Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M16.5 18.3333C17.05 18.3333 17.5 17.8837 17.5 17.3333C17.5 16.7829 17.05 16.3333 16.5 16.3333C15.95 16.3333 15.5 16.7829 15.5 17.3333C15.5 17.8837 15.95 18.3333 16.5 18.3333Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M2.917 2.917H4.583L6.25 13.75H15.833L17.5 6.25H5.833" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              View Cart
              {cartItems.length > 0 && (
                <span className="cart-badge">{cartItems.length}</span>
              )}
            </button>
            <button onClick={fetchOrders} className="action-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M16.667 2.5H3.333C2.417 2.5 1.667 3.25 1.667 4.167V15.833C1.667 16.75 2.417 17.5 3.333 17.5H16.667C17.583 17.5 18.333 16.75 18.333 15.833V4.167C18.333 3.25 17.583 2.5 16.667 2.5Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M1.667 7.5H18.333" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              Order History
            </button>
            <button onClick={checkout} className="action-btn checkout-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M16.667 5L7.5 14.167L3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Checkout
            </button>
            <button onClick={onLogout} className="action-btn logout-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 17.5H4.167C3.72 17.5 3.333 17.113 3.333 16.667V3.333C3.333 2.887 3.72 2.5 4.167 2.5H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M13.333 13.333L17.5 10L13.333 6.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.5 10H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Logout
            </button>
          </div>
        </div>

        {/* Cart Modal */}
        {showCart && (
          <div className="modal-overlay" onClick={() => setShowCart(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Your Cart</h2>
                <button onClick={() => setShowCart(false)} className="modal-close">&times;</button>
              </div>
              <div className="modal-body">
                {cartItems.length === 0 ? (
                  <p className="empty-message">Your cart is empty</p>
                ) : (
                  <>
                    <ul className="cart-list">
                      {cartItems.map((cartItem, index) => (
                        <li key={index} className="cart-item">
                          <div className="cart-item-image">
                            <img src={cartItem.item_id?.image || 'https://via.placeholder.com/80'} alt={cartItem.item_id?.name} />
                          </div>
                          <div className="cart-item-details">
                            <span className="cart-item-name">{cartItem.item_id?.name || 'Item'}</span>
                            <span className="cart-item-price">${cartItem.item_id?.price?.toFixed(2) || '0.00'}</span>
                          </div>
                          <button 
                            className="cart-item-remove"
                            onClick={() => removeFromCart(cartItem._id)}
                            title="Remove from cart"
                          >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="cart-total">
                      <span className="cart-total-label">Total:</span>
                      <span className="cart-total-amount">
                        ${cartItems.reduce((sum, item) => sum + (item.item_id?.price || 0), 0).toFixed(2)}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Orders Modal */}
        {showOrders && (
          <div className="modal-overlay" onClick={() => setShowOrders(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Order History</h2>
                <button onClick={() => setShowOrders(false)} className="modal-close">&times;</button>
              </div>
              <div className="modal-body">
                {orders.length === 0 ? (
                  <p className="empty-message">No orders yet</p>
                ) : (
                  <ul className="orders-list">
                    {orders.map((order) => (
                      <li key={order._id} className="order-item">
                        <div className="order-info">
                          <span className="order-label">Order ID:</span>
                          <span className="order-id">{order._id}</span>
                        </div>
                        <div className="order-date">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Main Content with Sidebar and Products */}
        <section className="products-section">
          <div className="products-container">
            <Filters
              isVisible={showFilters}
              onToggleVisibility={handleToggleFilters}
              itemCount={filteredItems.length}
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
              filters={filters}
              sortBy={sortBy}
            />

            <div className="products-main">
              {filteredItems.length === 0 ? (
                <div className="no-results">
                  <h3>No items found</h3>
                  <p>Try adjusting your filters or search query</p>
                </div>
              ) : (
                <div className="products-grid">
                  {productsFromItems.map((product) => (
                    <div key={product.id}>
                      <ProductCard
                        product={product}
                        onWishlistToggle={handleWishlistToggle}
                        isWishlisted={wishlistedItems.includes(product.id)}
                        onClick={() => handleProductClick(product)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Product Detail Modal */}
        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onClose={handleCloseProductDetail}
            onAddToCart={addToCart}
            onBuyNow={buyNow}
          />
        )}
      </div>
    </Router>
  );
};

export default ItemsList;
