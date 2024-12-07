import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import './newsletterModal.css';
import { OrderDetailsTable } from './checkout/detailstable'

function Checkout({ show, productsList, handleDeleteCart, onCloseButtonClick, handleConfirmation, handleError, updateCheckoutResponse }) {
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
  const donation = isCustomDonations ? parseFloat(customDonations) : selectedDonations;
  const orderTotal = orderSubtotal + serviceFee + donation;

  function handleClickDonation(value) {
    updateIsCustomDonations(false);
    updateSelectedDonation(value);
  }


  const isNumeric = /^\$?(100(\.00?)?|(\d{1,2})(\.\d{1,2})?)$/g;
  const handleCustomDonationChange = (event) => {
    if (event.target?.value && event.target.value.match(isNumeric)) {
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

  function clickPlaceOrder() {
    if (customerInfo.validEmail && customerInfo.validPhone && orderSubtotal > 0.0 && (isValidCustomDonations || !isCustomDonations)) {
      submitOrder()
    } else {
      setShowMissingInfo(true)
    }
  }

  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  function handleEmailChange(event) {
    if (event.target?.value && event.target.value.match(isValidEmail)) {
      console.log('VALID EMAIL')
      updatecustomerInfo({ ...customerInfo, email: event.target.value, validEmail: true })
    } else {
      console.log('EMAIL NOT VALID')
      updatecustomerInfo({ ...customerInfo, validEmail: false })
    }
  }

  const isValidPhone = /^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/g;
  function handlePhoneChange(event) {
    if (event.target?.value && event.target.value.match(isValidPhone)) {
      updatecustomerInfo({ ...customerInfo, phone: event.target.value, validPhone: true })
      console.log('VALID PHONE')
    } else {
      updatecustomerInfo({ ...customerInfo, validPhone: false })
      console.log('PHONE NOT VALID')
    }
  }


  if (!show) {
    return null;
  }

  return (
    <Dialog open={show} onClose={onCloseButtonClick} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex-col sm:items-end">
                <div className="w-full">
                  <button
                    className="absolute right-4 h-8 max-h-[32px] w-8 max-w-[32px] rounded-lg text-right bg-blue-500 transition-all hover:bg-blue-800"
                    type="button"
                    onClick={onCloseButtonClick}
                  >
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform hover:bg-blue-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="white"
                        strokeWidth="2"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
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
                          <button id="donation-0" className={(donation === 0 && !isCustomDonations ? "ring bg-violet-300 ring-violet-700" : "bg-gray-200 hover:bg-gray-300") + " text-gray-700 md:py-1 px-4 rounded cursor-pointer"} onClick={() => handleClickDonation(0)}>No donation</button>
                          <button id="donation-1" className={(donation === 1 && !isCustomDonations ? "ring bg-violet-300 ring-violet-700" : "bg-gray-200 hover:bg-gray-300") + " text-gray-700 md:py-1 px-4 rounded cursor-pointer"} onClick={() => handleClickDonation(1)}>$1</button>
                          <button id="donation-2" className={(donation === 2 && !isCustomDonations ? "ring bg-violet-300 ring-violet-700" : "bg-gray-200 hover:bg-gray-300") + " text-gray-700 md:py-1 px-4 rounded cursor-pointer"} onClick={() => handleClickDonation(2)}>$2</button>
                          <button id="donation-5" className={(donation === 5 && !isCustomDonations ? "ring bg-violet-300 ring-violet-700" : "bg-gray-200 hover:bg-gray-300") + " text-gray-700 md:py-1 px-4 rounded cursor-pointer"} onClick={() => handleClickDonation(5)}>$5</button>
                          <button id="donation-other" className={(isCustomDonations ? "ring bg-violet-300 ring-violet-700" : "bg-gray-200 hover:bg-gray-300") + " text-gray-700 md:py-1 px-4 rounded cursor-pointer"} onClick={() => updateIsCustomDonations(true)}>Other</button>
                          <input onChange={handleCustomDonationChange} placeholder="0.00" className={(isCustomDonations ? "ring ring-violet-700" : "border border-gray-300") + "bg-white-200 w-20 px-1 py-3/4 rounded"} row="1" disabled={!isCustomDonations}></input>
                        </div>
                        {!isValidCustomDonations && isCustomDonations && showMissingInfo ? <p className="font-bold text-red-500">You can donate up to $100</p> : <></>}
                      </div>
                    </div>
                    <div className="mb-6">
                      <OrderDetailsTable
                        orderDetails={
                          [
                            {"label":"Subtotal", "value":orderSubtotal},
                            {"label":"Service fee", "value":serviceFee},
                            {"label":"Donations", "value":donation},
                            {"label":"Total", "value":orderTotal}
                          ]
                        }
                      />
                    </div>
                    <table className="w-full mb-6">
                      <tbody>
                        <tr>
                          <td className="md:py-1 px-1 md:px-4 font-semibold text-sm md:text-base">First Name:</td>
                          <td className="px-1 md:px-4">
                            <textarea onChange={(e) => e.target?.value && updatecustomerInfo({ ...customerInfo, firstName: e.target.value })} rows="1" required className="w-full px-1 py-3/4 border border-gray-300 rounded" />
                          </td>
                        </tr>
                        <tr>
                          <td className="md:py-1 px-1 md:px-4 font-semibold text-sm md:text-base">Last Name:</td>
                          <td className="px-1 md:px-4">
                            <textarea onChange={(e) => e.target?.value && updatecustomerInfo({ ...customerInfo, lastName: e.target.value })} rows="1" required className="w-full px-1 py-3/4 border border-gray-300 rounded"></textarea>
                          </td>
                        </tr>
                        {!customerInfo.validEmail && showMissingInfo ? <tr><td></td><td><p className="px-4 font-bold text-red-500">!! Missing or Invalid Email</p></td></tr> : <tr><td></td></tr>}
                        <tr>
                          <td className="md:py-1 px-1 md:px-4 font-semibold text-sm md:text-base">Email:</td>
                          <td className="px-1 md:px-4">
                            <textarea onChange={handleEmailChange} type="text" placeholder="your@email.com" rows="1" required className="w-full px-1 py-3/4 border border-gray-300 rounded"></textarea>
                          </td>
                        </tr>
                        {!customerInfo.validPhone && showMissingInfo ? <tr><td></td><td><p className="px-4 font-bold text-red-500">!! Missing or Invalid Phone</p></td></tr> : <tr><td></td></tr>}
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
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
export default Checkout;