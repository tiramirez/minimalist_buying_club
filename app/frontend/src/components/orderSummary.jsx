import React, { useEffect, useState } from "react";
import { NumericFormat } from 'react-number-format';
import PlaceOrderBtn from './placeOrderBtn';
import './orderSummary.css';

export default function Summary({ productsList }) {
    const [orderSubtotal, updateSubtotal] = useState(0.00);
    const [products] = useState(productsList);

    useEffect(() => {
        var newSubtotal = 0.00;
        productsList.forEach(x => {
            newSubtotal += (x.product_quantity * x.unit_price);
        });
        updateSubtotal(newSubtotal);
    }, [productsList]);

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
            <PlaceOrderBtn productsList={productsList} />
        </div>
    )
};