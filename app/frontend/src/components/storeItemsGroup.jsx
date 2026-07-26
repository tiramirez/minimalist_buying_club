import React from 'react';
import { NumericFormat } from 'react-number-format';

function ItemBox({ Item, onIncrement, onReduction }) {
  const unitFormatted = Item.product_unit === 'each' ? ' ' : ' per ';
  return (
    <div className="flex items-center px-5 py-4 border-b border-[#F0EBE7] last:border-b-0 justify-between">
      <div className="flex-1 min-w-0 pr-5">
        <div className="text-[15px] font-medium text-brand-text-primary leading-snug">{Item.product_name}</div>
        <div className="text-[13px] text-brand-warm-gray mt-0.5">
          <NumericFormat value={Number(Item.unit_price).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          {unitFormatted}{Item.product_unit}
        </div>
      </div>
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <button
            className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-700 text-lg font-bold rounded-full border border-gray-300 hover:bg-gray-200"
            onClick={() => onReduction(Item.id)}
          >−</button>
          <span className="text-base font-semibold min-w-[20px] text-center tabular-nums text-brand-text-primary">{Item.product_quantity}</span>
          <button
            className={`w-8 h-8 flex items-center justify-center text-lg font-bold rounded-full ${Item.product_quantity > 0 ? 'bg-brand-rose text-white' : 'border border-brand-rose text-brand-rose bg-brand-off-white'}`}
            onClick={() => onIncrement(Item.id)}
          >+</button>
        </div>
        <NumericFormat
          className="text-[13px] font-semibold text-brand-rose tabular-nums"
          value={(Item.unit_price * Item.product_quantity).toFixed(2)}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
        />
      </div>
    </div>
  );
}

function ItemsGroup({ productsList, handleIncrement, handleReduction }) {
  return (
    <div className="bg-white rounded-xl border border-brand-border overflow-hidden shadow-[0_1px_6px_rgba(26,21,20,0.04)]">
      {productsList.map((singleItem) => (
        <ItemBox key={singleItem.id} Item={singleItem} onIncrement={handleIncrement} onReduction={handleReduction} />
      ))}
    </div>
  );
}

export default ItemsGroup;
