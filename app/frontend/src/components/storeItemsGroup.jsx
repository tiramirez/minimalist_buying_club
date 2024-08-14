import React from 'react';
import { NumericFormat } from 'react-number-format';
// import './storeItemsGroup.css';

function ItemBox({ Item, onIncrement, onReduction }) {
    const unitFormatted = Item.product_unit === 'each' ? ' ' : ' per ';
    return (
      <div className="flex justify-between items-center p-4 mb-4 bg-white rounded-lg shadow-md" key={Item.id}>
        <div className="flex">
          <div className="flex-column h-full items-center space-x-4 ">
            <div className="flex items-center">
              <button className="w-8 h-8 flex items-center justify-center bg-red-400 text-white text-xl font-bold rounded-xl md:rounded-full hover:bg-red-700" onClick={() => onReduction(Item.id)}>-</button>
              <p className="mx-2 text-lg">{Item.product_quantity}</p>
              <button className="w-8 h-8 flex items-center justify-center bg-green-400 text-white text-xl font-black rounded-xl md:rounded-full hover:bg-green-700" onClick={() => onIncrement(Item.id)}>+</button>
            </div>
            <div className="inline md:hidden text-lg font-medium text-gray-900">
              <NumericFormat value={(Item.unit_price * Item.product_quantity).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </div>

          </div>
          <div className='w-full pl-2'>
            <div className="font-medium text-gray-900">{Item.product_name}</div>
            <div className="text-sm text-gray-500">
              <NumericFormat value={Item.unit_price.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
              {unitFormatted}{Item.product_unit}
            </div>
          </div>
        </div>
        <div className="md:inline hidden text-sm font-medium text-gray-900">
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
