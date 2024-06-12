import React from 'react';
import './storeAisles.css';

// https://react.dev/learn/rendering-lists 

const aisleList = [
    {
        "id":'1',
        name: '🍎 Fresh Produce'
    },
    {
        "id":'2',
        name: '🥪 Deli and Prepared Foods'
    },
    {
        "id":'3',
        name: '🍞 Bakery and Bread Aisle'
    },
    {
        "id":'4',
        name: '🐄 Dairy and Refrigerated'
    },
    {
        "id":'5',
        name: '❄️ Frozen Foods'
    },
]

function AislesNav() {
    return (
        <div key='navMenuContainer'>
            <h2>Aisles</h2>
            <ul key='navMenu'>
                {aisleList.map((aisle) => (<li key={aisle.id}>{aisle.name}</li>))}
            </ul>
        </div>
    )
};
export default AislesNav;