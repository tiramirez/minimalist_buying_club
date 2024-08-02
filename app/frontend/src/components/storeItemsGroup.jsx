import React from 'react';
import { NumericFormat } from 'react-number-format';
// import './storeItemsGroup.css';

function ItemBox({ Item, onIncrement, onReduction }) {
    const unitFormatted = Item.product_unit === 'each' ? ' ' : ' per ';
    return (
      <div className="flex justify-between items-center p-4 mb-4 bg-white rounded-lg shadow-md" key={Item.id}>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <button className="w-8 h-8 flex items-center justify-center bg-red-500 text-white text-xs rounded-full hover:bg-red-700" onClick={() => onReduction(Item.id)}>-</button>
            <p className="mx-2 text-sm">{Item.product_quantity}</p>
            <button className="w-8 h-8 flex items-center justify-center bg-green-500 text-white text-xs rounded-full hover:bg-green-700" onClick={() => onIncrement(Item.id)}>+</button>
          </div>
          <div>
            <div className="font-medium text-gray-900">{Item.product_name}</div>
            <div className="text-sm text-gray-500">
              <NumericFormat value={Item.unit_price.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
              {unitFormatted}{Item.product_unit}
            </div>
          </div>
        </div>
        <div className="text-sm font-medium text-gray-900">
          <NumericFormat value={(Item.unit_price * Item.product_quantity).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        </div>
      </div>
    );
}

function ItemsGroup({ productsList, handleIncrement, handleReduction }) {
  return (
    <div className="space-y-4">
      {productsList.map((singleItem) => (
        <ItemBox key={singleItem.id} Item={singleItem} onIncrement={handleIncrement} onReduction={handleReduction} />
      ))}
    </div>
  );
}

export default ItemsGroup;
