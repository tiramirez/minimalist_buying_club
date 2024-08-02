import React from 'react';
import './storeAisles.css';
// import '../output.css';

// https://react.dev/learn/rendering-lists 
function AislesNav({ Categories, handleFilter }) {
    return (
      <div key="navMenuContainer" className="p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Aisles</h2>
        <ul key="navMenu" className="space-y-2">
          {Categories.map((aisle) => (
            <li key={aisle.id} id={aisle.id}>
              <a
                href="#"
                value={aisle.name}
                key={aisle.name}
                className="text-sm text-blue-600 hover:underline"
                onClick={(e) => {
                  handleFilter(e.target.attributes.value.value);
                }}
              >
                {aisle.name}
              </a>
            </li>
          ))}
        </ul>
        {/* <h2>{filterOption}</h2> */}
      </div>
    );
  }
export default AislesNav;