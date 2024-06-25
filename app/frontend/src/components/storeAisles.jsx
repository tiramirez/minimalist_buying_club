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

function AislesNav({ handleFilter }) {
    return (
        <div key='navMenuContainer'>
            <h2>Aisles</h2>
            <ul key='navMenu'>
                {aisleList.map((aisle) => (<li key={aisle.id} id={aisle.id}>
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