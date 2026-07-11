import { useEffect, useState } from "react";
import { getActiveVariant, getDeviceId } from '../utils/abVariant';
import { LayoutComponent } from './layout/modal'
import { UsersInfoForm } from './checkout/UsersForm'
import { OrderDetailsTable } from './checkout/DetailsTable'
import { DonationBox } from './checkout/DonationBox'
import { mainDonation } from '../assets/copy/donations'
import { SERVICE_FEE } from '../config/constants'

function Checkout({ show, updateShow, productsList, handleDeleteCart, onCloseButtonClick, handleConfirmation, handleError, updateCheckoutResponse }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showMissingInfo, setShowMissingInfo] = useState(false);
  const [orderSubtotal, updateSubtotal] = useState(0.00);
  const [selectedDonations, updateSelectedDonation] = useState(0.00);
  const [selectedTip] = useState(0.00);
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

  const orderTotal = orderSubtotal + SERVICE_FEE + selectedDonations + selectedTip;

  function submitOrder() {
    const api = import.meta.env.VITE_API
    const endpoint = 'checkout';
    const api_url = api + endpoint

    setIsLoading(true);
    fetch(api_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...customerInfo,
        donation: selectedDonations,
        tip: selectedTip,
        products: productsList.filter(item => item.product_quantity !== 0),
        comments: comment,
        variant: getActiveVariant() ?? 'unknown',
        device_id: getDeviceId(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if (data.message === 'Successful POST Execution') {
          updateCheckoutResponse(data);
          handleDeleteCart();
          onCloseButtonClick();
          handleConfirmation();
        } else {
          updateCheckoutResponse(data);
          handleError();
        }
      })
      .catch(() => {
        setIsLoading(false);
        alert("There was an error with the order");
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
                { "label": "Service fee", "value": SERVICE_FEE },
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
                className="w-full px-1 py-3/4 border border-brand-border rounded"
                onChange={(e) => updatecomment(e.target.value)}
                type="text"
                placeholder="Tell us what you think ..."
                rows="3"
                required
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button className="bg-white border border-brand-border text-brand-text-primary md:py-1 px-4 rounded hover:bg-brand-cream" onClick={onCloseButtonClick}>Add more Products</button>
            <button className="bg-brand-rose text-white md:py-1 px-4 rounded hover:bg-brand-terracotta" onClick={clickPlaceOrder}>Place Order</button>
          </div>
        </div>
      )}
    </LayoutComponent>
  );
}
export default Checkout;