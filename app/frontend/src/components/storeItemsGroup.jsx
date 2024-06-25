import React from 'react';
import { NumericFormat } from 'react-number-format';
import './storeItemsGroup.css';

function ItemBox({ Item, onIncrement, onReduction }) {

    // console.log('SINGLE ITEM', Item.product_name);
    return (
        <div className="itemBlock" key={Item.id} >
            <div className="itemDetails" >
                <div className="selectedAmount">
                    <button className="circleBtn BtnLeft" onClick={() => onReduction(Item.id)}>-</button>
                    <p className="productQuantity">{Item.product_quantity}</p>
                    <button className="circleBtn BtnRight" onClick={() => onIncrement(Item.id)}>+</button>
                </div>
                <div className="productName">{Item.product_name}</div>
                <div className="productUnitPrice"><NumericFormat value={Item.unit_price.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
            </div>
            <div className='productTotal'><NumericFormat value={(Item.unit_price * Item.product_quantity).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
        </div>
    );
};

function ItemsGroup({ productsList, handleIncrement, handleReduction }) {
    console.log('ITEMS GROUP', productsList);
    return (
        <div className="itemsGroup">
                {productsList.map((singleItem) => (<ItemBox key={singleItem.id} Item={singleItem} onIncrement={handleIncrement}  onReduction={handleReduction} />))}
        </div>
    );
};
export default ItemsGroup;
