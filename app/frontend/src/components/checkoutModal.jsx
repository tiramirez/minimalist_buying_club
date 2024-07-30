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
        <div className="inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            {isLoading ? (
              <h2 className="text-xl font-bold text-center">Loading ...</h2>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-4">Your order</h2>
                <div className="mb-6">
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold mb-2">Wine from Camuna Cellars</h4>
                    <p>
                      Purchase directly from the website and pick up at the PanPan. Use code PanPan5 for a 5% discount.
                      <a href="https://www.camunacellars.com/wine" className="text-blue-500 hover:underline"> camunacellars.com</a>
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">People's Fridge Donation</h4>
                    <p>
                      The People’s Fridge is a community fridge located at 125 S 52nd Street that is open 24/7 and free to all. Your donations will allow Pan Pan to purchase high quality food from our suppliers to donate to the fridge and the community members it serves. Each dollar donated will allow us to donate a dollar’s worth of local produce, baked goods, dairy products, and pantry goods to the fridge every week.
                    </p>
                    <div className="flex space-x-2 mt-4">
                      <div className="bg-gray-200 text-gray-700 py-2 px-4 rounded cursor-pointer hover:bg-gray-300" onClick={() => handleClickDonation(1)}>$1</div>
                      <div className="bg-gray-200 text-gray-700 py-2 px-4 rounded cursor-pointer hover:bg-gray-300" onClick={() => handleClickDonation(2)}>$2</div>
                      <div className="bg-gray-200 text-gray-700 py-2 px-4 rounded cursor-pointer hover:bg-gray-300" onClick={() => handleClickDonation(5)}>$5</div>
                      <div className="bg-gray-200 text-gray-700 py-2 px-4 rounded cursor-pointer hover:bg-gray-300">Other</div>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <table className="w-full text-left border-collapse">
                    <tbody>
                      <tr>
                        <td className="border-b py-2 px-4 font-semibold">Subtotal</td>
                        <td className="border-b py-2 px-4">
                          <NumericFormat value={orderSubtotal.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                        </td>
                      </tr>
                      <tr>
                        <td className="border-b py-2 px-4 font-semibold">Service fee</td>
                        <td className="border-b py-2 px-4">
                          <NumericFormat value={serviceFee.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                        </td>
                      </tr>
                      <tr>
                        <td className="border-b py-2 px-4 font-semibold">Donation</td>
                        <td className="border-b py-2 px-4">
                          <NumericFormat value={donations.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 font-semibold">Estimated Total</td>
                        <td className="py-2 px-4">
                          <NumericFormat value={orderTotal.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <table className="w-full mb-6">
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 font-semibold">First Name:</td>
                      <td className="py-2 px-4">
                        <textarea onChange={(e) => updatecustomerInfo({ ...customerInfo, firstName: e.target.value })} required className="w-full p-2 border border-gray-300 rounded"></textarea>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-semibold">Last Name:</td>
                      <td className="py-2 px-4">
                        <textarea onChange={(e) => updatecustomerInfo({ ...customerInfo, lastName: e.target.value })} required className="w-full p-2 border border-gray-300 rounded"></textarea>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-semibold">Email:</td>
                      <td className="py-2 px-4">
                        <textarea onChange={handleEmailChange} placeholder="your@email.com" required className="w-full p-2 border border-gray-300 rounded"></textarea>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-semibold">Phone:</td>
                      <td className="py-2 px-4">
                        <textarea onChange={handlePhoneChange} placeholder="+1 (123) 456 7890" required className="w-full p-2 border border-gray-300 rounded"></textarea>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex justify-end space-x-4">
                  <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700" onClick={onCloseButtonClick}>Add more Products</button>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={clickPlaceOrder}>Place Order</button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
export default Checkout;