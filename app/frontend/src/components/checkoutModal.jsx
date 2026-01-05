import { useEffect, useState } from "react";
import { LayoutComponent } from './layout/modal'
import { UsersInfoForm } from './checkout/usersform'
import { OrderDetailsTable } from './checkout/detailstable'
import { DonationBox } from './checkout/donationbox'
import { mainDonation } from '../assets/copy/donations'
import axios from 'axios';

function Checkout({ show, updateShow, productsList, handleDeleteCart, onCloseButtonClick, handleConfirmation, handleError, updateCheckoutResponse }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showMissingInfo, setShowMissingInfo] = useState(false);
  const [orderSubtotal, updateSubtotal] = useState(0.00);
  const [selectedDonations, updateSelectedDonation] = useState(0.00);
  const [selectedTip, updateSelectedTip] = useState(0.00);
  const [customerInfo, updatecustomerInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    validPhone: null,
    email: "",
    validEmail: null,
  });
  const [comment, updatecomment] = useState("");

  useEffect(() => {
    var newSubtotal = 0.00;
    productsList.forEach(x => {
      newSubtotal += (x.product_quantity * x.unit_price);
    });
    updateSubtotal(newSubtotal);
  }, [productsList]);

  const serviceFee = 4.00;

  const orderTotal = orderSubtotal + serviceFee + selectedDonations + selectedTip;

  function submitOrder() {
    const api = process.env.REACT_APP_API
    const endpoint = process.env.REACT_APP_ENDPOINT_ANSWERS;
    const api_url = api + endpoint

    const content = JSON.stringify({
      ...customerInfo,
      'donation': selectedDonations,
      'tip':selectedTip,
      'products': productsList.filter(item => item.product_quantity !== 0),
      'comments': comment
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
    if (customerInfo.validEmail && customerInfo.validPhone && orderSubtotal > 0.0 && selectedDonations <= 500 && selectedTip <= 999) {
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
            selectedDonation={selectedDonations}
            updateSelectedDonation={updateSelectedDonation}
            donationProps={mainDonation}
          />
          <OrderDetailsTable
            orderDetails={
              [
                { "label": "Subtotal", "value": orderSubtotal },
                { "label": "Service fee", "value": serviceFee },
                { "label": "Donation", "value": selectedDonations },
                { "label": "Tip", "value": selectedTip },
                { "label": "Total", "value": orderTotal }
              ]
            }
          />
          <UsersInfoForm
            customerInfo={customerInfo}
            updatecustomerInfo={updatecustomerInfo}
            showMissingInfo={showMissingInfo}
          />
          <div className="w-full pb-4 felx-col">
            <div className="md:py-1 font-semibold text-sm md:text-base">
              Comments:
            </div>
            <div>
              <textarea
                className="w-full px-1 py-3/4 border border-gray-300 rounded"
                onChange={(e) => updatecomment(e.target.value)}
                type="text"
                placeholder="Tell us what you think ..."
                rows="3"
                required
              />
            </div>
          </div>
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