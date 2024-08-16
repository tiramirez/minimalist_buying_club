import React, { useEffect, useState } from "react";
import { NumericFormat } from 'react-number-format';

export default function Summary({ productsList, showMyCart, handleMyCart, handleDeleteCart, clickOnCheckout }) {
    const [orderSubtotal, updateSubtotal] = useState(0.00);
    const [products] = useState(productsList);

    useEffect(() => {
        var newSubtotal = 0.00;
        productsList.forEach(x => {
            newSubtotal += (x.product_quantity * x.unit_price);
        });
        updateSubtotal(newSubtotal);
    }, [productsList]);

    function clickOnDeleteCart() {
        handleDeleteCart();
      }

    function clickOnMyCart() {
        handleMyCart();
      }

    const serviceFee = 4.00;
    const orderTotal = orderSubtotal + serviceFee;

    return (
        <div className="p-4 md:shadow md:rounded-lg md:bg-white bg-gray-200 w-full md:w-96">
          <h1 className="inline md:hidden text-3xl font-sans" >PanPan Store</h1>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-800">
              <tbody>
                <tr className="border-b border-black-200">
                  <td className="md:py-1 px-4 font-medium text-gray-900">Subtotal</td>
                  <td className="md:py-1 px-4 text-right">
                    <NumericFormat value={orderSubtotal.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="md:py-1 px-4 font-medium text-gray-900">Service fee</td>
                  <td className="md:py-1 px-4 text-right">
                    <NumericFormat value={serviceFee.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                  </td>
                </tr>
                <tr className="border-b font-bold text-gray-900">
                  <td className="md:py-1 px-4">Estimated Total</td>
                  <td className="md:py-1 px-4 text-right">
                    <NumericFormat value={orderTotal.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
            <div className="mt-1 flex w-full justify-between space-x-1">
                <button className={(!showMyCart?"bg-zinc-400 text-gray-400":"text-white bg-violet-500 ")+"rounded  font-semibold px-2 md:py-1 text-md md:text-sm hover:bg-blue-600 hover:text-white rounded"} onClick={clickOnMyCart}>In my Cart</button>
                <button className="px-2 md:py-1 text-md md:text-sm bg-red-500 text-white rounded hover:bg-red-700" onClick={clickOnDeleteCart}>Reset Cart</button>
                <button className="px-2 md:py-1 text-md md:text-sm bg-green-500 text-white rounded hover:bg-green-700" onClick={clickOnCheckout}>Checkout</button>
          </div>
        </div>
      );
};