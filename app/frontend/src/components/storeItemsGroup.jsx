import React, { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import './storeItemsGroup.css';

export default function ItemBox({ Item, onIncrement, onReduction }) {
    const [item] = useState(Item);
    // console.log('SINGLE ITEM', item.product_name);

    return (
        <div className="itemBlock" key={item.id} >
            <div className="itemDetails" >
                <div className="selectedAmount">
                    <button className="circleBtn BtnLeft" onClick={onReduction}>-</button>
                    <p className="productQuantity">{item.product_quantity}</p>
                    <button className="circleBtn BtnRight" onClick={onIncrement}>+</button>
                </div>
                <div className="productName">{item.product_name}</div>
                <div className="productUnitPrice"><NumericFormat value={item.unit_price.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
            </div>
            <div className='productTotal'><NumericFormat value={(item.unit_price * item.product_quantity).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
        </div>
    );
};
