import React, { useState, useRef, useEffect } from 'react';

function MobileAislesNav({ categories, activeFilter, onSelect, searchQuery, onSearch, scrolled }) {
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchMode]);

  function openSearch() {
    setIsSearchMode(true);
    setInputValue('');
    onSelect('📦 All Products');
    onSearch('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function closeSearch() {
    setIsSearchMode(false);
    setInputValue('');
    onSearch('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      closeSearch();
    }
  }

  // Shrink ~20% vertically when scrolled
  const vPad = scrolled ? 6 : 10;
  const iconSize = scrolled ? 28 : 34;
  const chipPad = scrolled ? '5px 12px' : '7px 14px';
  const chipFontSize = scrolled ? 12 : 13;

  return (
    <div
      className="flex md:hidden bg-white border-b border-brand-border flex-shrink-0 items-center sticky z-10"
      style={{
        padding: `${vPad}px 16px`,
        gap: '8px',
        top: scrolled ? 48 : 76,
        transition: 'padding 0.3s, top 0.3s',
      }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      {/* Magnifying glass — always first */}
      <button
        onClick={(e) => { e.stopPropagation(); isSearchMode ? closeSearch() : openSearch(); }}
        aria-label={isSearchMode ? 'Close search' : 'Search products'}
        style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: iconSize,
          height: iconSize,
          borderRadius: '99px',
          border: isSearchMode ? 'none' : '1.5px solid #E8E2DC',
          background: isSearchMode ? '#C4705E' : '#FDF7F5',
          cursor: 'pointer',
          transition: 'width 0.3s, height 0.3s',
        }}
      >
        {isSearchMode ? (
          <span style={{ color: '#fff', fontSize: 16, lineHeight: 1 }}>×</span>
        ) : (
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6.5" cy="6.5" r="5" stroke="#8A3E2E" strokeWidth="1.5"/>
            <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="#8A3E2E" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )}
      </button>

      {isSearchMode ? (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={e => { setInputValue(e.target.value); onSearch(e.target.value); }}
          onKeyDown={handleKeyDown}
          onClick={e => e.stopPropagation()}
          placeholder="Search products…"
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: 14,
            color: '#1A1514',
          }}
        />
      ) : (
        <div style={{ display: 'flex', overflowX: 'auto', gap: '8px', scrollbarWidth: 'none', flex: 1 }}>
          {categories.map((aisle) => {
            const label = aisle.name.split(' ').slice(0, 2).join(' ');
            const isActive = activeFilter === aisle.name;
            return (
              <button
                key={aisle.id}
                onClick={(e) => { e.stopPropagation(); onSelect(aisle.name); }}
                style={{
                  whiteSpace: 'nowrap',
                  padding: chipPad,
                  borderRadius: '99px',
                  flexShrink: 0,
                  cursor: 'pointer',
                  fontSize: chipFontSize,
                  fontWeight: 500,
                  border: isActive ? 'none' : '1.5px solid #E8E2DC',
                  background: isActive ? '#C4705E' : '#FDF7F5',
                  color: isActive ? '#fff' : '#8A3E2E',
                  transition: 'padding 0.3s, font-size 0.3s',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MobileAislesNav;
