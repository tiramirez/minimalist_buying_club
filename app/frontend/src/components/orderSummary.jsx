import React, { useEffect, useState } from "react";
import { NumericFormat } from 'react-number-format';
import { SERVICE_FEE } from '../config/constants';

export default function CartPanel({ productsList, handleIncrement, handleReduction, handleDeleteCart, clickOnCheckout }) {
  const [orderSubtotal, updateSubtotal] = useState(0.00);

  useEffect(() => {
    let newSubtotal = 0.00;
    productsList.forEach(x => {
      newSubtotal += (x.product_quantity * x.unit_price);
    });
    updateSubtotal(newSubtotal);
  }, [productsList]);

  const cartItems = productsList.filter(p => p.product_quantity > 0);
  const orderTotal = orderSubtotal + SERVICE_FEE;

  return (
    <div className="bg-white rounded-xl border border-brand-border shadow-[0_2px_10px_rgba(26,21,20,0.06)] overflow-hidden">

      <div className="px-5 py-[18px] border-b border-[#F0EBE7]">
        <h2 className="font-display text-[17px] font-bold text-brand-text-primary">Your cart</h2>
      </div>

      <div className="px-5 pt-3.5">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-4 text-brand-warm-gray">
            <span className="text-3xl opacity-50 mb-2">🛒</span>
            <p className="text-[13px] text-center leading-relaxed">Nothing here yet.<br/>Add something tasty!</p>
          </div>
        ) : (
          <div className="max-h-[210px] overflow-y-auto mb-2.5 flex flex-col">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center gap-2 py-1.5 border-b border-[#F5F0EC] last:border-b-0">
                <span className="flex-1 text-[13px] text-brand-text-primary truncate leading-snug">{item.product_name}</span>
                <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                  <div className="flex items-center gap-1.5">
                    <button
                      className="w-6 h-6 flex items-center justify-center rounded-full border border-brand-border text-brand-warm-gray hover:bg-brand-cream text-sm font-bold"
                      onClick={() => handleReduction(item.id)}
                    >−</button>
                    <span className="w-4 text-center text-[13px] font-bold tabular-nums">{item.product_quantity}</span>
                    <button
                      className="w-6 h-6 flex items-center justify-center rounded-full bg-brand-rose text-white hover:bg-brand-terracotta text-sm font-bold"
                      onClick={() => handleIncrement(item.id)}
                    >+</button>
                  </div>
                  <span className="text-[11px] font-semibold text-brand-rose tabular-nums">
                    <NumericFormat value={(item.unit_price * item.product_quantity).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-[#F0EBE7] pt-3 flex flex-col gap-1.5 mb-3.5">
          <div className="flex justify-between text-[13px] text-[#6B605A]">
            <span>Subtotal</span>
            <NumericFormat value={orderSubtotal.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          </div>
          <div className="flex justify-between text-[13px] text-[#6B605A]">
            <span>Service fee</span>
            <NumericFormat value={SERVICE_FEE.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          </div>
          <div className="flex justify-between text-[14px] font-bold text-brand-text-primary border-t border-brand-border pt-1.5 mt-0.5">
            <span>Estimated total</span>
            <NumericFormat value={orderTotal.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 flex flex-col gap-2">
        <button
          className="w-full bg-brand-rose text-white rounded-lg py-3 text-[14px] font-semibold hover:bg-brand-terracotta tracking-wide"
          onClick={clickOnCheckout}
        >
          Checkout →
        </button>
        <button
          className="w-full bg-transparent border border-brand-border text-brand-warm-gray rounded-lg py-2.5 text-[13px] hover:bg-brand-cream"
          onClick={handleDeleteCart}
        >
          Reset cart
        </button>
      </div>
    </div>
  );
}
