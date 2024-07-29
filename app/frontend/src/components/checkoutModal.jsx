import React, { useEffect, useState } from "react";
import axios from 'axios';
import { NumericFormat } from 'react-number-format';
import './newsletterModal.css';
import './checkoutModal.css';
import './orderSummary';

function Checkout({ show, productsList, handleDeleteCart, onCloseButtonClick }) {
    // const [newsletterContent, setContent] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [orderSubtotal, updateSubtotal] = useState(0.00);
    const [donations, updateDonation] = useState(0.00);
    const [customerInfo, updatecustomerInfo] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        validPhone: false,
        email: "",
        validEmail: false,
    });
    const [answerEmail, updateEmail] = useState("");
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
        updateDonation(value)
    }

    
    function submitOrder() {
        const api = process.env.REACT_APP_API
        const endpoint = process.env.REACT_APP_ENDPOINT_ANSWERS;
        const api_url = api + endpoint

        const content = JSON.stringify({
        ...customerInfo,
        'donation': donations,
        'products': productsList.filter(item => item.product_quantity !== 0)
        })

        console.log(content)
        axios.post(api_url, {
        method: 'POST',
        contentType: 'application/json',
        body: content})
        .then((response) => {
            console.log(response['data']);
        });

        handleDeleteCart();
        onCloseButtonClick();
  };

  function clickPlaceOrder () {

      if (customerInfo.validEmail && customerInfo.validPhone) {
          submitOrder()
      } else{
          console.log('Missing Info')
      }
  }
  

    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    
    function handleEmailChange(event) {
        if(event.target?.value && event.target.value.match(isValidEmail)){
            // showNoValidEmail(false);
            updateEmail(event.target.value);
            updatecustomerInfo({...customerInfo, email:event.target.value, validEmail: true})
            console.log('Email IS valid')
            console.log(customerInfo)
        }else{
            // showNoValidEmail(true);
            console.log('Email is not valid')
        }
        // console.log(event.target.value);
        // updateEmail(event.target.value);
    }
    
    const isValidPhone = /^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/g;
    function handlePhoneChange(event) {
        if(event.target?.value && event.target.value.match(isValidPhone)){
            // showNoValidEmail(false);
            updateEmail(event.target.value);
            console.log('Phone IS valid')
            updatecustomerInfo({...customerInfo, phone:event.target.value, validPhone:true})
            console.log(customerInfo)
          }else{
            // showNoValidEmail(true);
            console.log('Phone is not valid')
          }
        // console.log(event.target.value);
        // updateEmail(event.target.value);
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
                            <table className="User-Form">
                                <tr>
                                    <td className="col1">Fist Name:</td>
                                    <td className="col2"><textarea key="fisrtName" onChange={(e)=>{updatecustomerInfo({...customerInfo, firstName:e.target.value})}} required/></td>
                                </tr>
                                <tr>
                                    <td className="col1">Last Name:</td>
                                    <td className="col2"><textarea key="lastName" onChange={(e)=>{updatecustomerInfo({...customerInfo, lastName:e.target.value})}} required/></td>
                                </tr>
                                <tr>
                                    <td className="col1">Email:</td>
                                    <td className="col2"><textarea key="textareaEmail" onChange={handleEmailChange}  placeholder="your@email.com" required/></td>
                                </tr>
                                <tr>
                                    <td className="col1">Phone:</td>
                                    <td className="col2"><textarea key="textareaPhone" onChange={handlePhoneChange}  placeholder="+1 (123) 456 7890" required/></td>
                                </tr>
                            </table>
                        <div className="Display-buttons">
                            <button className="myButton Secondary-button" onClick={onCloseButtonClick}>Add more Products</button>
                            <button className="myButton" onClick={clickPlaceOrder}>Place Order</button>
                        </div>
                    </div>
                )
                }

            </div>
        </div>
    );
};
export default Checkout;