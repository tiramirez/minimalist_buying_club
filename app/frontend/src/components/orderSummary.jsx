import React, { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { NumericFormat } from 'react-number-format';
// import './orderSummary.css';
import '../output.css';

export default function Summary({ productsList, handleDeleteCart, clickOnCheckout }) {
    const [orderSubtotal, updateSubtotal] = useState(0.00);
    const [products] = useState(productsList);
    const [cookies, setCookie, removeCookie] = useCookies('active-cart');

    useEffect(() => {
        var newSubtotal = 0.00;
        productsList.forEach(x => {
            newSubtotal += (x.product_quantity * x.unit_price);
        });
        updateSubtotal(newSubtotal);
    }, [productsList]);

    function clickOnDeleteCart() {
        removeCookie('active-cart');
        handleDeleteCart();
      }

    const serviceFee = 4.00;
    const orderTotal = orderSubtotal + serviceFee;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-4 font-medium text-gray-900">Subtotal</td>
                  <td className="py-2 px-4 text-right">
                    <NumericFormat value={orderSubtotal.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-medium text-gray-900">Service fee</td>
                  <td className="py-2 px-4 text-right">
                    <NumericFormat value={serviceFee.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                  </td>
                </tr>
                <tr className="border-b font-bold text-gray-900">
                  <td className="py-2 px-4">Estimated Total</td>
                  <td className="py-2 px-4 text-right">
                    <NumericFormat value={orderTotal.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex space-x-4">
          <div className="mt-4 flex space-x-4">
        <button className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-700" onClick={clickOnDeleteCart}>Reset Cart</button>
        <button className="px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-700" onClick={clickOnCheckout}>Checkout</button>
      </div>
          </div>
        </div>
      );
};