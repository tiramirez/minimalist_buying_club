import React, { useEffect, useState } from "react";
import { NumericFormat } from 'react-number-format';
import { SERVICE_FEE } from '../config/constants';

export default function MobileCartSheet({ productsList, handleIncrement, handleReduction, handleDeleteCart, clickOnCheckout, onClose }) {
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

  function handleCheckout() {
    onClose();
    clickOnCheckout();
  }

  function handleReset() {
    handleDeleteCart();
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center md:hidden"
      style={{ background: 'rgba(26,21,20,0.48)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-2xl w-full max-w-[480px] max-h-[88vh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-brand-border flex justify-between items-center flex-shrink-0">
          <h2 className="font-display text-xl font-bold text-brand-text-primary">Your cart</h2>
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center text-xl text-brand-warm-gray hover:bg-[#F0E8E4]"
            style={{ background: '#F0E8E4', border: 'none' }}
            onClick={onClose}
          >×</button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-brand-warm-gray">
              <div className="text-4xl mb-3 opacity-50">🛒</div>
              <div className="text-[15px] font-medium text-[#4A4240] mb-1">Nothing here yet</div>
              <div className="text-sm">Add items from the product list.</div>
            </div>
          ) : (
            <div className="flex flex-col py-1">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-3 py-3.5 border-b border-[#F5F0EC] last:border-b-0">
                  <div className="flex-1 text-[15px] text-brand-text-primary leading-snug min-w-0">{item.product_name}</div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <div className="flex items-center gap-2.5">
                      <button
                        className="w-7 h-7 flex items-center justify-center rounded-full border border-brand-border text-brand-warm-gray text-base font-bold hover:bg-brand-cream"
                        onClick={() => handleReduction(item.id)}
                      >−</button>
                      <span className="text-[15px] font-bold text-brand-text-primary min-w-[20px] text-center tabular-nums">{item.product_quantity}</span>
                      <button
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-brand-rose text-white text-base font-bold hover:bg-brand-terracotta"
                        onClick={() => handleIncrement(item.id)}
                      >+</button>
                    </div>
                    <span className="text-[13px] font-semibold text-brand-rose tabular-nums">
                      <NumericFormat value={(item.unit_price * item.product_quantity).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary footer */}
        <div className="px-6 py-4 border-t border-brand-border bg-brand-cream flex-shrink-0">
          <div className="flex flex-col gap-1.5 mb-4">
            <div className="flex justify-between text-sm text-[#6B605A]">
              <span>Subtotal</span>
              <NumericFormat value={orderSubtotal.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </div>
            <div className="flex justify-between text-sm text-[#6B605A]">
              <span>Service fee</span>
              <NumericFormat value={SERVICE_FEE.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </div>
            <div className="flex justify-between text-[15px] font-bold text-brand-text-primary border-t border-brand-border pt-2 mt-0.5">
              <span>Estimated total</span>
              <NumericFormat value={orderTotal.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </div>
          </div>
          <div className="flex gap-2.5">
            <button
              className="px-4 py-3 border-[1.5px] border-brand-border rounded-lg bg-white text-brand-warm-gray text-sm hover:bg-brand-cream flex-shrink-0"
              onClick={handleReset}
            >Reset</button>
            <button
              className="flex-1 py-3 bg-brand-rose text-white border-none rounded-lg text-[15px] font-semibold hover:bg-brand-terracotta"
              onClick={handleCheckout}
            >Checkout →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
