import React, { useEffect, useState, useMemo } from "react";
import axios from 'axios';
// import './newsletterModal.css';
import { LayoutComponent } from './layout/modal'
import { UsersInfoForm } from './checkout/usersform'
import { OrderDetailsTable } from './checkout/detailstable'
import { DonationBox } from './checkout/donationbox'

const peoplesFridgeDonation = {
  title: "People's Fridge Donation",
  description: "The People’s Fridge is a community fridge located at 125 S 52nd Street that is open 24/7 and free to all. Your donations will allow Pan Pan to purchase high quality food from our suppliers to donate to the fridge and the community members it serves. Each dollar donated will allow us to donate a dollar’s worth of local produce, baked goods, dairy products, and pantry goods to the fridge every week.",
  donationOptions: [
    { label: "No donation", value: 0 },
    { label: "$1", value: 1 },
    { label: "$2", value: 2 },
    { label: "$5", value: 5 },
  ]
}

const endofyearDonation = {
  title: "🎄End of Year Staff Tips🎄",
  description: "",
  donationOptions: [
    { label: "No Tip", value: 0 },
    { label: "$1", value: 1 },
    { label: "$2", value: 2 },
    { label: "$5", value: 5 },
  ]
}

function Checkout({ show, updateShow, productsList, handleDeleteCart, onCloseButtonClick, handleConfirmation, handleError, updateCheckoutResponse }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showMissingInfo, setShowMissingInfo] = useState(false);
  const [orderSubtotal, updateSubtotal] = useState(0.00);
  const [selectedDonations, updateSelectedDonation] = useState(0.00);
  const [endofYearDonation, updatEndofYearDonation] = useState(0.00);
  const [customerInfo, updatecustomerInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    validPhone: null,
    email: "",
    validEmail: null,
  });

  useEffect(() => {
    var newSubtotal = 0.00;
    productsList.forEach(x => {
      newSubtotal += (x.product_quantity * x.unit_price);
    });
    updateSubtotal(newSubtotal);
  }, [productsList]);

  const serviceFee = 4.00;
  const donation = useMemo(() => {
    return selectedDonations + endofYearDonation;
  }, [selectedDonations, endofYearDonation])

  const orderTotal = orderSubtotal + serviceFee + donation;

  function submitOrder() {
    const api = process.env.REACT_APP_API
    const endpoint = process.env.REACT_APP_ENDPOINT_ANSWERS;
    const api_url = api + endpoint

    const content = JSON.stringify({
      ...customerInfo,
      'donation': selectedDonations,
      'tip': endofYearDonation,
      'products': productsList.filter(item => item.product_quantity !== 0)
    })

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
    if (customerInfo.validEmail && customerInfo.validPhone && orderSubtotal > 0.0 && selectedDonations <= 500 && endofYearDonation <= 500 ) {
      submitOrder()
    } else {
      setShowMissingInfo(true)
    }
  }

  if (!show) {
    return null;
  }

  return (
    <LayoutComponent show={show} updateShow={updateShow}>
      {isLoading ? (
        <h2 className="text-xl font-bold text-center">Loading ...</h2>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Your order</h2>
          <DonationBox
            selectedDonation={endofYearDonation}
            updateSelectedDonation={updatEndofYearDonation}
            donationProps={endofyearDonation}
          />
          <DonationBox
            selectedDonation={selectedDonations}
            updateSelectedDonation={updateSelectedDonation}
            donationProps={peoplesFridgeDonation}
          />
          <OrderDetailsTable
            orderDetails={
              [
                { "label": "Subtotal", "value": orderSubtotal },
                { "label": "Service fee", "value": serviceFee },
                { "label": "Donation + Tips", "value": donation },
                { "label": "Total", "value": orderTotal }
              ]
            }
          />
          <UsersInfoForm
            customerInfo={customerInfo}
            updatecustomerInfo={updatecustomerInfo}
            showMissingInfo={showMissingInfo}
          />
          <div className="flex justify-end space-x-4">
            <button className="bg-gray-500 text-white md:py-1 px-4 rounded hover:bg-gray-700" onClick={onCloseButtonClick}>Add more Products</button>
            <button className="bg-blue-500 text-white md:py-1 px-4 rounded hover:bg-blue-700" onClick={clickPlaceOrder}>Place Order</button>
          </div>
        </div>
      )}
    </LayoutComponent>
  );
}
export default Checkout;