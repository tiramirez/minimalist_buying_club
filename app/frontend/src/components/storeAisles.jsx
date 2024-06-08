import React from 'react';
import './storeAisles.css';

// https://react.dev/learn/rendering-lists 

const aisleList = [
    {
        name: '🍎 Fresh Produce'
    },
    {
        name: '🥪 Deli and Prepared Foods'
    },
    {
        name: '🍞 Bakery and Bread Aisle'
    },
    {
        name: '🐄 Dairy and Refrigerated'
    },
    {
        name: '❄️ Frozen Foods'
    },
]

function AislesNav() {
    return (
        <div>
            <h2>Aisles</h2>
            <ul>
                {aisleList.map((aisle) => (<li>{aisle.name}</li>))}
            </ul>
        </div>
    )
};
export default AislesNav;