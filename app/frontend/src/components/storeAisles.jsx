import React from 'react';
import './storeAisles.css';
// import '../output.css';

// https://react.dev/learn/rendering-lists 
function AislesNav({ Categories, handleFilter }) {
  return (
    <div className="hidden md:inline">
      <h2 className="text-lg font-semibold text-gray-700 m-2 px-4 pb-0">Aisles</h2>
      <div key="navMenuContainer" className="bg-inherit p-2 h-80 overflow-y-auto">
        <ul key="navMenu" className="space-y-2">
          {Categories.map((aisle) => (
            <div key={aisle.id} id={aisle.id} className="bg-gray-200 rounded-md p-2 hover:bg-blue-200">
              <p
                href="#"
                value={aisle.name}
                key={aisle.name}
                className="text-sm text-blue-600 hover:underline"
                onClick={(e) => {
                  handleFilter(e.target.attributes.value.value);
                }}
              >
                {aisle.name}
              </p>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default AislesNav;