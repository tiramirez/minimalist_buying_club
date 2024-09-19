import React from 'react';
import { NumericFormat } from 'react-number-format';

function ItemBox({ Item, showMyCart, onIncrement, onReduction }) {
    const unitFormatted = Item.product_unit === 'each' ? ' ' : ' per ';
    return (
      <div>
      {!showMyCart?
        <div className="flex bg-white p-2 mb-4 shadow-md justify-between rounded-lg" key={Item.id}>
          {/* // ITEM NAME AND UNIT PRICE */}
          <div className='w-full pl-2'>
            <div className="font-medium text-gray-900">{Item.product_name}</div>
            <div className="text-sm text-gray-500">
              <NumericFormat value={Item.unit_price.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
              {unitFormatted}{Item.product_unit}
            </div>
          </div>
          {/* // BUTTONS */}
                    <div className="flex flex-col h-full items-center w-24">
            <div className="flex flex-row items-center">
              <button className="w-8 h-8 flex items-center justify-center bg-red-400 text-white text-xl font-bold rounded-xl md:rounded-full hover:bg-red-700" onClick={() => onReduction(Item.id)}>-</button>
              <p className="mx-2 text-lg">{Item.product_quantity}</p>
              <button className="w-8 h-8 flex justify-center bg-green-400 text-white text-xl font-black rounded-xl md:rounded-full hover:bg-green-700" onClick={() => onIncrement(Item.id)}>+</button>
            </div>
          {/* // ITEM TOTAL */}
            <NumericFormat className="inline-flex items-center text-lg text-gray-900" value={(Item.unit_price * Item.product_quantity).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          </div>
        </div>
        :
        <div className="flex h-auto w-wv border-t border-gray-500">
          <NumericFormat className="w-20 pl-2 text-sm md:text-base text-right" value={(Item.unit_price * Item.product_quantity).toFixed(2)} minimumIntegerDigits={2} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          <p className="w-16 pl-4 text-base text-sm md:text-base text-left">{Item.product_quantity}x {Item.product_unit} </p>
          <p className="w-80 md:w-80 pl-6 text-sm md:text-base text-left">{Item.product_name}</p>
        </div>
        }
      </div>
    );
}

function ItemsGroup({ productsList, showMyCart, handleIncrement, handleReduction }) {
  return (
    <div className="h-1/5 overflow-y-scroll">
      {!showMyCart?<div></div>:
        <div className="flex h-auto w-wv">
          <p className="w-20 pl-2 font-bold text-right">Total</p>
          <p className="w-16 pl-4 font-bold text-base text-left"> Units </p>
          <p className="w-80 md:w-80 font-bold pl-6 text-left">Item</p>
        </div>
      }
      {productsList.map((singleItem) => (
        <ItemBox key={singleItem.id} Item={singleItem} showMyCart={showMyCart} onIncrement={handleIncrement} onReduction={handleReduction} />
      ))}
    </div>
  );
}

export default ItemsGroup;
