import React from 'react';
import './storeAisles.css';
// import '../output.css';

// https://react.dev/learn/rendering-lists 
function AislesNav({ Categories, showMyCart, handleFilter }) {
    return (
      <div key="navMenuContainer" className="bg-inherit md:bg-gray-100 md:rounded-lg">
        <div className="inline md:hidden bg-inherit text-xl">
          {showMyCart?<>Order details</>:
            <select 
              name="filterDropdown" id="filterDropdown"
              className='w-full bg-inherit text-white'
              onChange={(e) => {
                  console.log(e);
                  handleFilter(e.target.value);
                }}>
              {Categories.map((aisle) => (
                <option key={aisle.id} id={aisle.id} className='bg-gray-100' value={aisle.name}>
                    {aisle.name}
                  </option>
              ))}
            </select>
          }
        </div>
        <div className="hidden md:inline">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 p-4 pb-0">Aisles</h2>
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
        </div>
      </div>
    );
  }
export default AislesNav;