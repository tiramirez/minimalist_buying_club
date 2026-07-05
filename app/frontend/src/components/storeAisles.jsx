import React from 'react';

const categoryEmoji = {
  'all products': '🛒',
  'produce': '🌿',
  'baking': '🥜',
  'baking needs': '🥜',
  'beverages': '🥤',
  'bread': '🍞',
  'bread & baked goods': '🍞',
  'cheese': '🧀',
  'cheese & charcuterie': '🧀',
  'coffee': '☕',
  'coffee, tea & hot cocoa': '☕',
  'meat': '🥩',
  'pantry': '🫙',
  'dairy': '🥛',
};

function getEmoji(name) {
  const key = name.toLowerCase().replace(/^📦\s*/, '');
  return categoryEmoji[key] ?? '🏷️';
}

function AislesNav({ Categories, handleFilter, activeFilter }) {
  return (
    <div className="flex flex-col flex-1">
      <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-brand-warm-gray mb-2.5 px-2.5">Aisles</div>
      <nav className="flex flex-col gap-0.5 overflow-y-auto flex-1">
        {Categories.map((aisle) => {
          const isActive = activeFilter === aisle.name;
          const emoji = getEmoji(aisle.name);
          const label = aisle.name.replace(/^📦\s*/, '');
          return (
            <button
              key={aisle.id}
              onClick={() => handleFilter(aisle.name)}
              className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm text-left transition-colors cursor-pointer ${
                isActive ? 'bg-brand-rose text-white' : 'text-brand-text-primary hover:bg-brand-rose-light'
              }`}
            >
              <span className="flex-shrink-0 w-5 text-center text-[15px]">{emoji}</span>
              <span className="flex-1 leading-snug">{label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default AislesNav;
