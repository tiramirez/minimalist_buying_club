import React from "react";
import PlaceOrderBtn from './placeOrderBtn';
import './orderSummary.css';

export default function Summary () {
    return (
        <div className='Summary'>
            <div className="Summary-table'">
                <table>
                    <tr>
                <th>Subtotal</th>
                <th>$36.50 </th>
                    </tr>
                    <tr>
                <th>Service fee</th>
                <th>$ 4.00 </th>
                    </tr>
                    <tr>
                <th>Estimated Total__</th>
                <th>$40.50</th>
                    </tr>
                </table>
            </div>
            <PlaceOrderBtn />
        </div>
    )
};