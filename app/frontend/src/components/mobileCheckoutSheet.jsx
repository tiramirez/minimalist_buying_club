import { useEffect, useState } from "react";
import { getActiveVariant, getDeviceId } from '../utils/abVariant';
import { UsersInfoForm } from './checkout/UsersForm';
import { OrderDetailsTable } from './checkout/DetailsTable';
import { DonationBox } from './checkout/DonationBox';
import { mainDonation } from '../assets/copy/donations';
import { SERVICE_FEE } from '../config/constants';

const CUSTOMER_INFO_KEY = 'panpan-customer-info';

function loadSavedCustomerInfo() {
  try {
    const saved = localStorage.getItem(CUSTOMER_INFO_KEY);
    if (saved) {
      const p = JSON.parse(saved);
      return {
        firstName: p.firstName || "",
        lastName: p.lastName || "",
        phone: p.phone || "",
        validPhone: !!p.phone,
        email: p.email || "",
        validEmail: !!p.email,
        additionalEmails: [],
        additionalEmailsValid: [],
      };
    }
  } catch {}
  return {
    firstName: "",
    lastName: "",
    phone: "",
    validPhone: null,
    email: "",
    validEmail: null,
    additionalEmails: [],
    additionalEmailsValid: [],
  };
}

export default function MobileCheckoutSheet({ show, onClose, productsList, handleDeleteCart, handleConfirmation, handleError, updateCheckoutResponse }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showMissingInfo, setShowMissingInfo] = useState(false);
  const [orderSubtotal, updateSubtotal] = useState(0.00);
  const [selectedDonations, updateSelectedDonation] = useState(0.00);
  const [saveInfo, setSaveInfo] = useState(false);
  const [customerInfo, updatecustomerInfo] = useState(loadSavedCustomerInfo);
  const [comment, updatecomment] = useState("");

  useEffect(() => {
    let newSubtotal = 0.00;
    productsList.forEach(x => {
      newSubtotal += (x.product_quantity * x.unit_price);
    });
    updateSubtotal(newSubtotal);
  }, [productsList]);

  const orderTotal = orderSubtotal + SERVICE_FEE + selectedDonations;

  function submitOrder() {
    const api = import.meta.env.VITE_API;
    const api_url = api + 'checkout';

    setIsLoading(true);
    fetch(api_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        email: customerInfo.email,
        phone: customerInfo.phone,
        additionalEmails: (customerInfo.additionalEmails || []).filter(Boolean),
        donation: selectedDonations,
        products: productsList.filter(item => item.product_quantity !== 0),
        comments: comment,
        variant: getActiveVariant() ?? 'unknown',
        device_id: getDeviceId(),
      }),
    })
      .then(res => res.json())
      .then(data => {
        setIsLoading(false);
        if (data.message === 'Successful POST Execution') {
          if (saveInfo) {
            localStorage.setItem(CUSTOMER_INFO_KEY, JSON.stringify({
              firstName: customerInfo.firstName,
              lastName: customerInfo.lastName,
              phone: customerInfo.phone,
              email: customerInfo.email,
            }));
          }
          updateCheckoutResponse(data);
          handleDeleteCart();
          onClose();
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
  }

  function clickPlaceOrder() {
    const additionalEmailsAllValid = (customerInfo.additionalEmails || []).every(
      (e, i) => !e || customerInfo.additionalEmailsValid?.[i]
    );
    if (
      customerInfo.validEmail &&
      customerInfo.validPhone &&
      customerInfo.lastName &&
      orderSubtotal > 0.0 &&
      selectedDonations <= 500 &&
      additionalEmailsAllValid
    ) {
      submitOrder();
    } else {
      setShowMissingInfo(true);
    }
  }

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center md:hidden"
      style={{ background: 'rgba(26,21,20,0.48)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-2xl w-full max-w-[480px] max-h-[88dvh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-brand-border flex justify-between items-center flex-shrink-0">
          <h2 className="font-display text-xl font-bold text-brand-text-primary">Your order</h2>
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center text-xl text-brand-warm-gray"
            style={{ background: '#F0E8E4', border: 'none' }}
            onClick={onClose}
          >×</button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 py-4">
          {isLoading ? (
            <p className="text-center text-brand-warm-gray py-10">Loading…</p>
          ) : (
            <>
              <DonationBox
                selectedDonation={selectedDonations}
                updateSelectedDonation={updateSelectedDonation}
                donationProps={mainDonation}
              />
              <OrderDetailsTable
                orderDetails={[
                  { label: "Subtotal", value: orderSubtotal },
                  { label: "Service fee", value: SERVICE_FEE },
                  { label: "Donation", value: selectedDonations },
                  { label: "Total", value: orderTotal },
                ]}
              />
              <UsersInfoForm
                customerInfo={customerInfo}
                updatecustomerInfo={updatecustomerInfo}
                showMissingInfo={showMissingInfo}
                saveInfo={saveInfo}
                setSaveInfo={setSaveInfo}
              />
              <div className="w-full pb-4">
                <div className="font-semibold text-sm mb-1">Comments:</div>
                <textarea
                  className="w-full px-3 py-2 border border-brand-border rounded text-sm"
                  onChange={e => updatecomment(e.target.value)}
                  placeholder="Tell us what you think …"
                  rows="3"
                />
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-brand-border bg-brand-cream flex-shrink-0 flex gap-2.5">
          <button
            className="px-4 py-3 border-[1.5px] border-brand-border rounded-lg bg-white text-brand-warm-gray text-sm hover:bg-brand-cream flex-shrink-0"
            onClick={onClose}
          >Add more items</button>
          <button
            className="flex-1 py-3 bg-brand-rose text-white border-none rounded-lg text-[15px] font-semibold hover:bg-brand-terracotta"
            onClick={clickPlaceOrder}
          >Place Order →</button>
        </div>
      </div>
    </div>
  );
}
