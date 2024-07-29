import React from 'react';
import './storeAisles.css';

// https://react.dev/learn/rendering-lists 

function AislesNav({ Categories, handleFilter }) {
    return (
        <div key='navMenuContainer'>
            <h2>Aisles</h2>
            <ul key='navMenu'>
                {Categories.map((aisle) => (<li key={aisle.id} id={aisle.id}>
                    <a href="#" value={aisle.name} key={aisle.name} onClick={(e)=>{
                        handleFilter(e.target.attributes.value.value);
                        }}>
                        {aisle.name}
                    </a>
                </li>))}
            </ul>
            {/* <h2>{filterOption}</h2> */}
        </div>
    )
};
export default AislesNav;