import React from 'react';
import './storeAisles.css';

// https://react.dev/learn/rendering-lists 

const aisleList = [
    {
        "id":'',
        name: '🍎 Fresh Produce'
    },
    {
        "id":'',
        name: '🥪 Deli and Prepared Foods'
    },
    {
        "id":'',
        name: '🍞 Bakery and Bread Aisle'
    },
    {
        "id":'',
        name: '🐄 Dairy and Refrigerated'
    },
    {
        "id":'',
        name: '❄️ Frozen Foods'
    },
]

function AislesNav() {
    return (
        <div>
            <h2>Aisles</h2>
            <ul>
                {aisleList.map((aisle) => (<li key={aisle.id}>{aisle.name}</li>))}
            </ul>
        </div>
    )
};
export default AislesNav;