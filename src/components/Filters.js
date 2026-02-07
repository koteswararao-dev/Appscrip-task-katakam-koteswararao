import React, { useState, useEffect, useRef } from 'react';
import './Filters.css';

const Filters = ({ 
  onFilterChange, 
  onSortChange, 
  isVisible, 
  onToggleVisibility,
  itemCount,
  filters: externalFilters,
  sortBy: externalSortBy
}) => {
  const sidebarRef = useRef(null);

  // Use external filters if provided, otherwise use internal state
  const [internalFilters, setInternalFilters] = useState({
    category: 'all',
    priceRange: [0, 1000],
    customizable: false,
    idealFor: 'all',
    occasion: 'all',
    work: 'all',
    fabric: 'all',
    segment: 'all',
    suitableFor: 'all',
    rawMaterials: 'all',
    pattern: 'all'
  });

  const filters = externalFilters || internalFilters;
  const [internalSortBy, setInternalSortBy] = useState('recommended');
  const sortBy = externalSortBy !== undefined ? externalSortBy : internalSortBy;
  const [expandedFilters, setExpandedFilters] = useState({});

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isVisible && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        // Only close on mobile (when sidebar is fixed)
        if (window.innerWidth <= 768) {
          onToggleVisibility();
        }
      }
    };

    if (isVisible && window.innerWidth <= 768) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isVisible, onToggleVisibility]);

  const handleFilterChange = (filterName, value) => {
    const newFilters = {
      ...filters,
      [filterName]: value
    };
    
    // Update internal state if not using external
    if (!externalFilters) {
      setInternalFilters(newFilters);
    }
    
    // Always notify parent
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    
    // Update internal state if not using external
    if (externalSortBy === undefined) {
      setInternalSortBy(value);
    }
    
    // Always notify parent
    if (onSortChange) {
      onSortChange(value);
    }
  };

  const toggleFilterExpansion = (filterName) => {
    setExpandedFilters({
      ...expandedFilters,
      [filterName]: !expandedFilters[filterName]
    });
  };

  const filterOptions = {
    category: ['All', 'Electronics', 'Furniture', 'Accessories'],
    idealFor: ['All', 'Men', 'Women', 'Kids', 'Unisex'],
    occasion: ['All', 'Casual', 'Formal', 'Party', 'Sports'],
    work: ['All', 'Office', 'Home', 'Travel', 'Outdoor'],
    fabric: ['All', 'Cotton', 'Polyester', 'Leather', 'Wool', 'Silk'],
    segment: ['All', 'Bags', 'Accessories', 'Clothing', 'Home Decor'],
    suitableFor: ['All', 'Daily Use', 'Special Occasions', 'Gifts'],
    rawMaterials: ['All', 'Organic', 'Recycled', 'Premium'],
    pattern: ['All', 'Solid', 'Striped', 'Printed', 'Embroidered']
  };

  return (
    <>
      {/* SHOW FILTERS button removed - now using filter icon in Header */}
      <aside 
        ref={sidebarRef}
        className={`filters-sidebar ${isVisible ? 'show' : ''}`} 
        aria-label="Product filters"
      >
      <div className="filters-header">
        <div className="filter-header-content">
          <div className="filter-item-count">
            {itemCount} ITEMS
          </div>
          <button 
            className="hide-filters-btn"
            onClick={(e) => {
              e.stopPropagation();
              onToggleVisibility();
            }}
            aria-label="Hide filters"
          >
            &lt; HIDE FILTER
          </button>
        </div>
      </div>

      <div className="filters-content">
        {/* Customizable Checkbox */}
        <div className="filter-group">
          <label className="filter-checkbox">
            <input
              type="checkbox"
              checked={filters.customizable}
              onChange={(e) => handleFilterChange('customizable', e.target.checked)}
            />
            <span>CUSTOMIZABLE</span>
          </label>
        </div>

        {/* Filter Categories */}
        {Object.keys(filterOptions).map((filterKey) => (
          <div key={filterKey} className="filter-group">
            <button
              className="filter-title"
              onClick={(e) => {
                e.stopPropagation();
                toggleFilterExpansion(filterKey);
              }}
              aria-expanded={expandedFilters[filterKey]}
            >
              <span>{filterKey.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}</span>
              <span className="filter-arrow">
                {expandedFilters[filterKey] ? '▼' : '▶'}
              </span>
            </button>
            {expandedFilters[filterKey] && (
              <div className="filter-options">
                {filterOptions[filterKey].map((option) => (
                  <label key={option} className="filter-option">
                    <input
                      type="radio"
                      name={filterKey}
                      value={option.toLowerCase()}
                      checked={filters[filterKey] === option.toLowerCase()}
                      onChange={() => handleFilterChange(filterKey, option.toLowerCase())}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Price Range Filter */}
        <div className="filter-group">
          <button
            className="filter-title"
            onClick={(e) => {
              e.stopPropagation();
              toggleFilterExpansion('price');
            }}
            aria-expanded={expandedFilters.price}
          >
            <span>PRICE</span>
            <span className="filter-arrow">
              {expandedFilters.price ? '▼' : '▶'}
            </span>
          </button>
          {expandedFilters.price && (
            <div className="filter-options price-filter">
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange[0]}
                  onChange={(e) => handleFilterChange('priceRange', [
                    parseInt(e.target.value) || 0,
                    filters.priceRange[1]
                  ])}
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [
                    filters.priceRange[0],
                    parseInt(e.target.value) || 1000
                  ])}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sort Dropdown */}
      <div className="sort-section">
        <label htmlFor="sort-select" className="sort-label">SORT BY</label>
        <select
          id="sort-select"
          className="sort-select"
          value={sortBy}
          onChange={handleSortChange}
          aria-label="Sort products"
        >
          <option value="recommended">RECOMMENDED</option>
          <option value="newest">NEWEST</option>
          <option value="popular">MOST POPULAR</option>
          <option value="price-low">PRICE: LOW TO HIGH</option>
          <option value="price-high">PRICE: HIGH TO LOW</option>
        </select>
      </div>
    </aside>
    </>
  );
};

export default Filters;

