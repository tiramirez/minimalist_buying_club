import { useEffect, useRef, useState } from "react";
import { getActiveVariant, getDeviceId } from '../utils/abVariant';
import { LayoutComponent } from './layout/modal'
import { UsersInfoForm } from './checkout/UsersForm'
import { OrderDetailsTable } from './checkout/DetailsTable'
import { DonationBox } from './checkout/DonationBox'
import { mainDonation } from '../assets/copy/donations'
import { SERVICE_FEE } from '../config/constants'
import { loadSavedCustomerInfo, hasSavedCustomerInfo, saveCustomerInfo, clearCustomerInfo, getNameProblem, normalizeName } from '../utils/customerInfo';

function Checkout({ show, updateShow, productsList, handleDeleteCart, onCloseButtonClick, handleConfirmation, handleError, updateCheckoutResponse }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showMissingInfo, setShowMissingInfo] = useState(false);
  const [orderSubtotal, updateSubtotal] = useState(0.00);
  const [selectedDonations, updateSelectedDonation] = useState(0.00);
  // Stays checked once the customer opted in (their info is already saved)
  const [saveInfo, setSaveInfo] = useState(hasSavedCustomerInfo);
  const [customerInfo, updatecustomerInfo] = useState(loadSavedCustomerInfo);
  // Saved info had a bad name: customer re-enters it and decides whether to overwrite what's saved
  const [needsReentry] = useState(() => customerInfo.needsReentry);
  const [overwriteSaved, setOverwriteSaved] = useState(null);
  const [comment, updatecomment] = useState("");
  // Synchronous guard: state updates are async, so a fast double click/tap could submit twice
  const submittingRef = useRef(false);
  // Idempotency key for this checkout attempt; reused on retry, reset after success
  const checkoutIdRef = useRef(null);

  useEffect(() => {
    var newSubtotal = 0.00;
    productsList.forEach(x => {
      newSubtotal += (x.product_quantity * x.unit_price);
    });
    updateSubtotal(newSubtotal);
  }, [productsList]);

  const orderTotal = orderSubtotal + SERVICE_FEE + selectedDonations;

  function submitOrder() {
    const api = import.meta.env.VITE_API
    const endpoint = 'checkout';
    const api_url = api + endpoint

    if (submittingRef.current) return;
    submittingRef.current = true;
    checkoutIdRef.current ??= crypto.randomUUID();

    setIsLoading(true);
    fetch(api_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: normalizeName(customerInfo.firstName),
        lastName: normalizeName(customerInfo.lastName),
        email: customerInfo.email,
        phone: customerInfo.phone,
        additionalEmails: (customerInfo.additionalEmails || []).filter(Boolean),
        donation: selectedDonations,
        products: productsList.filter(item => item.product_quantity !== 0),
        comments: comment,
        variant: getActiveVariant() ?? 'unknown',
        device_id: getDeviceId(),
        checkout_id: checkoutIdRef.current,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if (data.message === 'Successful POST Execution') {
          checkoutIdRef.current = null;
          submittingRef.current = false;
          if (needsReentry) {
            // "No, only for this order" leaves the saved info as-is (they'll be asked again next time)
            if (overwriteSaved) saveCustomerInfo(customerInfo);
          } else if (saveInfo) {
            saveCustomerInfo(customerInfo);
          } else {
            clearCustomerInfo();
          }
          updateCheckoutResponse(data);
          handleDeleteCart();
          onCloseButtonClick();
          handleConfirmation();
        } else {
          updateCheckoutResponse(data);
          handleError();
          submittingRef.current = false;
        }
      })
      .catch(() => {
        setIsLoading(false);
        submittingRef.current = false;
        alert("There was an error with the order");
      });
  };

  function clickPlaceOrder() {
    const additionalEmailsAllValid = (customerInfo.additionalEmails || []).every(
      (e, i) => !e || customerInfo.additionalEmailsValid?.[i]
    );
    if (
      customerInfo.validEmail &&
      customerInfo.validPhone &&
      getNameProblem(customerInfo) === null &&
      (!needsReentry || overwriteSaved !== null) &&
      orderSubtotal > 0.0 &&
      selectedDonations <= 500 &&
      additionalEmailsAllValid
    ) {
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
                { "label": "Total", "value": orderTotal }
              ]
            }
          />
          <UsersInfoForm
            customerInfo={customerInfo}
            updatecustomerInfo={updatecustomerInfo}
            showMissingInfo={showMissingInfo}
            saveInfo={saveInfo}
            setSaveInfo={setSaveInfo}
            needsReentry={needsReentry}
            overwriteSaved={overwriteSaved}
            setOverwriteSaved={setOverwriteSaved}
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
            <button className="bg-brand-rose text-white md:py-1 px-4 rounded hover:bg-brand-terracotta disabled:opacity-50 disabled:cursor-not-allowed" onClick={clickPlaceOrder} disabled={isLoading}>Place Order</button>
          </div>
        </div>
      )}
    </LayoutComponent>
  );
}
export default Checkout;
