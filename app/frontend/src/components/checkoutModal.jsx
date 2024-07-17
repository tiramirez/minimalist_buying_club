import React, { useEffect, useState } from "react";
import PlaceOrderBtn from './placeOrderBtn';
import { NumericFormat } from 'react-number-format';
import './newsletterModal.css';
import './checkoutModal.css';
import './orderSummary';

function Checkout({ show, productsList, onCloseButtonClick }) {
    // const [newsletterContent, setContent] = useState({});
    const [isLoading, setIsLoading] = useState(false);
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

    if (!show) {
        return null;
    }

    return (
        <div className="Modal-Box">
            <div className="Modal-Content">
                {isLoading ? (
                    <h2>Loading ...</h2>
                ) : (
                    <div>
                        <h2>Your order</h2>
                        <div className="Checkout-placeholder">
                        </div>
                        <div className="Checkout-placeholder">
                        </div>
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

                            {/* <PlaceOrderBtn productsList={productsList} /> */}
                            <button className="myButton Secondary-button" onClick={onCloseButtonClick}>Add more Products</button>
                            <button className="myButton" onClick={onCloseButtonClick}>Place Order</button>
                        </div>
                    </div>
                )
                }

            </div>
        </div>
    );
};
export default Checkout;