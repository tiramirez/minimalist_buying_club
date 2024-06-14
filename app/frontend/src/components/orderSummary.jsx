import React, { useEffect, useState } from "react";
import { NumericFormat } from 'react-number-format';
import PlaceOrderBtn from './placeOrderBtn';
import './orderSummary.css';

export default function Summary(props) {
    const [orderSubtotal,setOrderTotal] = useState(0.00);
    const serviceFee = 4.00;
    const orderTotal = orderSubtotal + serviceFee;

    // Need to move this to a parent Component https://react.dev/learn#using-hooks
    useEffect(()=>{
        setOrderTotal(props.Items.reduce((acc, o) => acc + parseInt(o.unit_price * o.product_quantity), 0))
    },[]);

    return (
        <div className='Summary'>
            <div className="Summary-table'">
                <table>
                    <tbody>
                    <tr>
                        <th>Subtotal</th>
                        <th>
                            <NumericFormat value={orderSubtotal.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                        </th>
                    </tr>
                    <tr>
                        <th>Service fee</th>
                        <th>
                            <NumericFormat value={serviceFee.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                        </th>
                    </tr>
                    <tr>
                        <th>Estimated Total__</th>
                        <th>
                            <NumericFormat value={orderTotal.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                        </th>
                    </tr>
                    </tbody>
                </table>
            </div>
            <PlaceOrderBtn />
        </div>
    )
};