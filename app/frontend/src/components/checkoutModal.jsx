import React, { useEffect, useState } from "react";
import axios from 'axios';
import { NumericFormat } from 'react-number-format';
import './newsletterModal.css';

function Checkout({ show, productsList, handleDeleteCart, onCloseButtonClick , handleConfirmation, handleError, updateCheckoutResponse}) {
    // const [newsletterContent, setContent] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showMissingInfo, setShowMissingInfo] = useState(false);
    const [orderSubtotal, updateSubtotal] = useState(0.00);
    const [selectedDonations, updateSelectedDonation] = useState(0.00);
    const [customDonations, updateCustomDonation] = useState("0.00");
    const [isCustomDonations, updateIsCustomDonations] = useState(false);
    const [isValidCustomDonations, updateIsValidCustomDonations] = useState(false);
    const [customerInfo, updatecustomerInfo] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        validPhone: null,
        email: "",
        validEmail: null,
    });
    // const [products] = useState(productsList);

    useEffect(() => {
        var newSubtotal = 0.00;
        productsList.forEach(x => {
            newSubtotal += (x.product_quantity * x.unit_price);
        });
        updateSubtotal(newSubtotal);
    }, [productsList]);

    const serviceFee = 4.00;
    const donation = isCustomDonations?parseFloat(customDonations):selectedDonations;
    const orderTotal = orderSubtotal + serviceFee + donation;

    function handleClickDonation (value) {
      updateIsCustomDonations(false);
      updateSelectedDonation(value);
    }
    
    
    const isNumeric = /^\$?(100(\.00?)?|(\d{1,2})(\.\d{1,2})?)$/g;
    const handleCustomDonationChange = (event) => {
      if (event.target?.value  && event.target.value.match(isNumeric)) {
        console.log("Valid number", event.target.value);
        updateCustomDonation(event.target.value);
        updateIsValidCustomDonations(true)
      } else {
        updateIsValidCustomDonations(false)
      }
    }
    
    function submitOrder() {
      const api = process.env.REACT_APP_API
      const endpoint = process.env.REACT_APP_ENDPOINT_ANSWERS;
      const api_url = api + endpoint

      const content = JSON.stringify({
        ...customerInfo,
        'donation': donation,
        'products': productsList.filter(item => item.product_quantity !== 0)
      })

      // console.log(content)
      setIsLoading(true);
      axios.post(api_url, {
        method: 'POST',
        contentType: 'application/json',
        body: content
      })
      .catch((error) => {
        error && alert("There was an error with the order");
        setIsLoading(false);
      })
      .then((response) => {
        setIsLoading(false);
        console.log(response);
        if (response && response.data['statusCode'] === 200) {
          const responseContent = JSON.parse(response.data.body)
          console.log("Order received", responseContent);
          updateCheckoutResponse(JSON.parse(response.data.body));
          handleDeleteCart();
          onCloseButtonClick();
          handleConfirmation();
        } else {
          console.log('Error');
          updateCheckoutResponse(JSON.parse(response.data.body));
          handleError();
        }
      });

  };

  function clickPlaceOrder () {
      if (customerInfo.validEmail && customerInfo.validPhone && orderSubtotal > 0.0 && (isValidCustomDonations || !isCustomDonations)) {
          submitOrder()
      } else{
        setShowMissingInfo(true)
      }
  }

  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  function handleEmailChange(event) {
    if(event.target?.value && event.target.value.match(isValidEmail)){
      console.log('VALID EMAIL')
      updatecustomerInfo({...customerInfo, email:event.target.value, validEmail: true})
    }else{
      console.log('EMAIL NOT VALID')
      updatecustomerInfo({...customerInfo, validEmail: false})
    }
  }
  
  const isValidPhone = /^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/g;
  function handlePhoneChange(event) {
    if(event.target?.value && event.target.value.match(isValidPhone)){
      updatecustomerInfo({...customerInfo, phone:event.target.value, validPhone:true})
      console.log('VALID PHONE')
    } else {
      updatecustomerInfo({...customerInfo, validPhone: false})
      console.log('PHONE NOT VALID')
    }
  }

    
    if (!show) {
        return null;
    }

    return (
        <div className="Modal-Box inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-full mx-auto my-5 bg-white p-6 rounded-lg shadow-lg relative lg:w-2/3 h-screen md:h-4/5 overflow-y-scroll">
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
                    <div className="flex space-x-2 mt-4 pl-1 py-1 overflow-x-scroll">
                      <button id="donation-0" className={(donation===0 && !isCustomDonations?"ring bg-violet-300 ring-violet-700":"bg-gray-200 hover:bg-gray-300")+" text-gray-700 md:py-1 px-4 rounded cursor-pointer"} onClick={() => handleClickDonation(0)}>Remove donation</button>
                      <button id="donation-1" className={(donation===1 && !isCustomDonations?"ring bg-violet-300 ring-violet-700":"bg-gray-200 hover:bg-gray-300")+" text-gray-700 md:py-1 px-4 rounded cursor-pointer"} onClick={() => handleClickDonation(1)}>$1</button>
                      <button id="donation-2" className={(donation===2 && !isCustomDonations?"ring bg-violet-300 ring-violet-700":"bg-gray-200 hover:bg-gray-300")+" text-gray-700 md:py-1 px-4 rounded cursor-pointer"} onClick={() => handleClickDonation(2)}>$2</button>
                      <button id="donation-5" className={(donation===5 && !isCustomDonations?"ring bg-violet-300 ring-violet-700":"bg-gray-200 hover:bg-gray-300")+" text-gray-700 md:py-1 px-4 rounded cursor-pointer"} onClick={() => handleClickDonation(5)}>$5</button>
                      <button id="donation-other" className={(isCustomDonations?"ring bg-violet-300 ring-violet-700":"bg-gray-200 hover:bg-gray-300")+" text-gray-700 md:py-1 px-4 rounded cursor-pointer"} onClick={() => updateIsCustomDonations(true)}>Other</button>
                      <input onChange={handleCustomDonationChange} placeholder="0.00" className={(isCustomDonations?"ring ring-violet-700":"border border-gray-300")+"bg-white-200 w-20 px-1 py-3/4 rounded"} row="1"  disabled={!isCustomDonations}></input>
                    </div>
                    {!isValidCustomDonations && isCustomDonations && showMissingInfo ? <p className="font-bold text-red-500">You can donate up to $100</p>: <></>}
                  </div>
                </div>
                <div className="mb-6">
                  <table className="w-full text-left border-collapse">
                    <tbody>
                      <tr>
                        <td className="border-b md:py-1 px-1 md:px-4 font-semibold">Subtotal</td>
                        <td className="border-b md:py-1 px-1 md:px-4 text-right">
                          <NumericFormat value={orderSubtotal.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                        </td>
                      </tr>
                      <tr>
                        <td className="border-b md:py-1 px-1 md:px-4 font-semibold">Service fee</td>
                        <td className="border-b md:py-1 px-1 md:px-4 text-right">
                          <NumericFormat value={serviceFee.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                        </td>
                      </tr>
                      <tr>
                        <td className="border-b md:py-1 px-1 md:px-4 font-semibold">Donation</td>
                        <td className="border-b md:py-1 px-1 md:px-4 text-right">
                          <NumericFormat value={donation.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                        </td>
                      </tr>
                      <tr>
                        <td className="border-b md:py-1 px-1 md:px-4 font-semibold">Estimated Total</td>
                        <td className="font-bold md:py-1 px-1 md:px-4 text-right">
                          <NumericFormat value={orderTotal.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <table className="w-full mb-6">
                  <tbody>
                    <tr>
                      <td className="md:py-1 px-1 md:px-4 font-semibold text-sm md:text-base">First Name:</td>
                      <td className="px-1 md:px-4">
                        <textarea onChange={(e) => e.active?.value && updatecustomerInfo({ ...customerInfo, firstName: e.active.value })} rows="1" required className="w-full px-1 py-3/4 border border-gray-300 rounded"/>
                      </td>
                    </tr>
                    <tr>
                      <td className="md:py-1 px-1 md:px-4 font-semibold text-sm md:text-base">Last Name:</td>
                      <td className="px-1 md:px-4">
                        <textarea onChange={(e) => e.active?.value && updatecustomerInfo({ ...customerInfo, lastName: e.active.value })} rows="1" required className="w-full px-1 py-3/4 border border-gray-300 rounded"></textarea>
                      </td>
                    </tr>
                    {!customerInfo.validEmail && showMissingInfo ? <tr><td></td><td><p className="px-4 font-bold text-red-500">!! Missing or Invalid Email</p></td></tr>: <tr><td></td></tr>}
                    <tr>
                      <td className="md:py-1 px-1 md:px-4 font-semibold text-sm md:text-base">Email:</td>
                      <td className="px-1 md:px-4">
                        <textarea onChange={handleEmailChange} type="text" placeholder="your@email.com" rows="1" required className="w-full px-1 py-3/4 border border-gray-300 rounded"></textarea>
                      </td>
                    </tr>
                    {!customerInfo.validPhone && showMissingInfo ? <tr><td></td><td><p className="px-4 font-bold text-red-500">!! Missing or Invalid Phone</p></td></tr>: <tr><td></td></tr>}
                    <tr>
                      <td className="md:py-1 px-1 md:px-4 font-semibold text-sm md:text-base">Phone:</td>
                      <td className="px-1 md:px-4">
                        <textarea onChange={handlePhoneChange} type="number" placeholder="(123)4567890" rows="1" required className="w-full px-1 py-3/4 border border-gray-300 rounded"></textarea>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex justify-end space-x-4">
                  <button className="bg-gray-500 text-white md:py-1 px-4 rounded hover:bg-gray-700" onClick={onCloseButtonClick}>Add more Products</button>
                  <button className="bg-blue-500 text-white md:py-1 px-4 rounded hover:bg-blue-700" onClick={clickPlaceOrder}>Place Order</button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
export default Checkout;