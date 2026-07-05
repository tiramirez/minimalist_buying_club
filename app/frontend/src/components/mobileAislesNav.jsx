import React from 'react';

function MobileAislesNav({ categories, activeFilter, onSelect }) {
  return (
    <div
      className="flex md:hidden bg-white border-b border-brand-border flex-shrink-0"
      style={{ overflowX: 'auto', gap: '8px', padding: '10px 16px', scrollbarWidth: 'none' }}
    >
      {categories.map((aisle) => {
        const label = aisle.name.split(' ').slice(0, 2).join(' ');
        const isActive = activeFilter === aisle.name;
        return (
          <button
            key={aisle.id}
            onClick={() => onSelect(aisle.name)}
            style={{
              whiteSpace: 'nowrap',
              padding: '7px 14px',
              borderRadius: '99px',
              flexShrink: 0,
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 500,
              border: isActive ? 'none' : '1.5px solid #E8E2DC',
              background: isActive ? '#C4705E' : '#FDF7F5',
              color: isActive ? '#fff' : '#8A3E2E',
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default MobileAislesNav;
