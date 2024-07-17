import React, { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { NumericFormat } from 'react-number-format';
import './orderSummary.css';

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
        <div className='Summary'>
            <div className="Summary-table'">
                <table>
                    <tbody>
                        <tr>
                            <td className="col1">Subtotal</td>
                            <td className="col2">
                                <NumericFormat value={orderSubtotal.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                            </td>
                        </tr>
                        <tr>
                            <td className="col1">Service fee</td>
                            <td className="col2">
                                <NumericFormat value={serviceFee.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                            </td>
                        </tr>
                        <tr className="lastRow">
                            <td className="col1">Estimated Total</td>
                            <td className="col2">
                                <NumericFormat value={orderTotal.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="Display-buttons">
                <button className="myButton Secondary-button" onClick={clickOnDeleteCart}>Reset Cart</button>
                <button className="myButton" onClick={clickOnCheckout}>Checkout</button>
            </div>
        </div>
    )
};