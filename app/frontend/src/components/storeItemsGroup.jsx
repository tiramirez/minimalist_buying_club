import React, { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import './storeItemsGroup.css';

function ItemBox(props) {
    const [quantity, setQuantity] = useState(props.Item.product_quantity);

    function handleIncrement() {
        // console.log('Try to Increment', props.Item.product_name);
        props.Item.updateQuantityIncrease();
        setQuantity(props.Item.product_quantity);
    };

    function handleReduction() {
        console.log('Try to reduce', props.Item.product_name)
        props.Item.updateQuantityReduce();
        setQuantity(props.Item.product_quantity);
    };

    // console.log('SINGLE ITEM', props.Item.product_name);
    return (
        <div className="itemBlock" >
            <div className="itemDetails" key={props.Item.id}>
                <div className="selectedAmount">
                    <button className="circleBtn BtnLeft" onClick={handleReduction}>-</button>
                    <p className="productQuantity">{props.Item.product_quantity}</p>
                    <button className="circleBtn BtnRight" onClick={handleIncrement}>+</button>
                </div>
                <div className="productName">{props.Item.product_name}</div>
                <div className="productUnitPrice"><NumericFormat value={props.Item.unit_price.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
            </div>
            <div className='productTotal'><NumericFormat value={(props.Item.unit_price * props.Item.product_quantity).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
        </div>
    );
};

function ItemsGroup(props) {
    console.log('ITEMS GROUP', props.items);
    return (
        <div className="itemsGroup">
            <h2>Items List</h2>
            <div>
                {props.items.map((singleItem) => (<ItemBox Item={singleItem} />))}
            </div>
        </div>
    );
};
export default ItemsGroup;
