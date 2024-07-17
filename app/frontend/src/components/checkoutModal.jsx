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
    const [donations, updateDonation] = useState(0.00);
    const [products] = useState(productsList);

    useEffect(() => {
        var newSubtotal = 0.00;
        productsList.forEach(x => {
            newSubtotal += (x.product_quantity * x.unit_price);
        });
        updateSubtotal(newSubtotal);
    }, [productsList]);

    const serviceFee = 4.00;
    const orderTotal = orderSubtotal + serviceFee + donations;

    function handleClickDonation (value) {
        
    }

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
                            <div className="section-description">
                                <h4>Wine from Camuna Cellars</h4>
                                Purchase directly from the website and pick up at the PanPan. Use code PanPan5 for a 5% discount. 
                                <a href="https://www.camunacellars.com/wine">camunacellars.com</a>
                            </div>

                        </div>
                        <div className="Checkout-placeholder">
                            <div className="section-description">
                                <h4>People's Fridge Donation</h4>
                                The People’s Fridge is a community fridge located at 125 S 52nd Street that is open 24/7 and free to all. Your donations will allow Pan Pan to purchase high quality food from our suppliers to donate to the fridge and the community members it serves. Each dollar donated will allow us to donate a dollar’s worth of local produce, baked goods, dairy products, and pantry goods to the fridge every week.
                            </div>
                            <div className="donation-options">
                                <div className="donation-button" onClick={()=>{handleClickDonation(1)}}>$1</div>
                                <div className="donation-button" onClick={()=>{handleClickDonation(2)}}>$2</div>
                                <div className="donation-button" onClick={()=>{handleClickDonation(5)}}>$5</div>
                                <div className="donation-button">Other</div>
                            </div>

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
                                    <tr>
                                        <td className="col1">Donation</td>
                                        <td className="col2">
                                            <NumericFormat value={donations.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
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