import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import { useCookies } from 'react-cookie';
import ItemsGroup from './components/storeItemsGroup';
import AislesNav from './components/storeAisles';
import MobileAislesNav from './components/mobileAislesNav';
import CartPanel from './components/orderSummary';
import MobileCartSheet from './components/mobileCartSheet';
import MobileNewsletterSheet from './components/mobileNewsletterSheet';
import MobileCheckoutSheet from './components/mobileCheckoutSheet';
import Newsletter from './components/newsletterModal';
import { NumericFormat } from 'react-number-format';
import { SERVICE_FEE } from './config/constants';

import fetchData, { ItemObject } from './api/fetchItems';
import Checkout from './components/checkoutModal';
import AlertModal from "./components/confirmationModal";
import ConsentBanner from './components/ConsentBanner';
import { isTrackingEnabled, getConsent, setConsent } from './utils/consent';
import './output.css';

const logo = "" + '/logo.svg';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterOption, setFilterOption] = useState('📦 All Products');
  const [showNewsletter, setShowNewsletter] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies('active-cart');
  const maxRetries = 3;

  const [checkoutResponse, setCheckoutResponse] = useState({ 'title': '', 'body': '' });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showCheckoutError, setShowCheckoutError] = useState(false);
  const [showMobileCart, setShowMobileCart] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [searchQuery, setSearchQuery] = useState('');
  const needsConsent = isTrackingEnabled() && getConsent() === null;
  const [consentResolved, setConsentResolved] = useState(!needsConsent);
  const [showConsentBanner, setShowConsentBanner] = useState(needsConsent);
  const [cartPop, setCartPop] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bounceClass, setBounceClass] = useState('');
  const prevCartCount = useRef(0);
  const listRef = useRef(null);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  var refDate = new Date();
  refDate.setDate(refDate.getDate() + (7 - refDate.getDay()));

  useEffect(() => {
    if (!consentResolved) return;
    let retryCount = 0;
    async function loadProducts() {
      try {
        const resp = await fetchData();
        if (resp) {
          const parsed = JSON.parse(resp);
          const items = (parsed.Items ?? parsed).map((item) => {
            const obj = new ItemObject(item);
            if (cookies['active-cart']) {
              const cartItem = cookies['active-cart'].find(c => c.id === obj.id);
              if (cartItem) obj.product_quantity = cartItem.product_quantity;
            }
            return obj;
          });
          setProducts(items);
        } else if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(loadProducts, 2000);
        } else {
          console.log('Max retries reached. Failed to fetch items.');
        }
      } catch (error) {
        console.log(error);
      }
    }
    loadProducts();
  }, [consentResolved]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const categoriesArray = [];
    products.forEach((item) => {
      if (!categoriesArray.includes(item.product_category)) {
        categoriesArray.push(item.product_category);
      }
    });
    categoriesArray.sort();
    setCategories(['📦 All Products', ...categoriesArray].map((name, index) => ({ id: index + 1, name })));
  }, [products]);

  function handleClickNewsletter() {
    setShowNewsletter(!showNewsletter);
  }
  function handleShowConfirmation() {
    setShowConfirmation(!showConfirmation);
  }
  function handleshowCheckoutError() {
    setShowCheckoutError(!showCheckoutError);
  }
  function handleClickCheckout() {
    setShowCheckout(!showCheckout);
  }

  function handleConsentResolved(choice) {
    setConsent(choice);
    setShowConsentBanner(false);
    setConsentResolved(true);
  }

  function updateProductQuantity(productId, operation) {
    const newProducts = [...products];
    const item = newProducts.find(p => p.id === productId);
    if (operation === 'increase') item.updateQuantityIncrease();
    else item.updateQuantityReduce();
    setProducts(newProducts);
    setCookie(
      'active-cart',
      JSON.stringify(newProducts.filter(p => p.product_quantity > 0)),
      { expires: refDate }
    );
  }

  function deleteCart() {
    const newProducts = [...products];
    newProducts.map(item => item.updateQuantityReset());
    setProducts(newProducts);
    removeCookie('active-cart');
  }

  const weekLabel = refDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  function selectFilter(aisleId) {
    setFilterOption(aisleId);
    setSearchQuery('');
    if (isMobile) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }

  useEffect(() => {
    if (!isMobile) return;
    const onWindowScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', onWindowScroll);
  }, [isMobile]);

  const lastScrollTop = useRef(0);

  function handleListScroll() {
    const el = listRef.current;
    if (!el) return;
    const top = el.scrollTop;
    const prev = lastScrollTop.current;
    lastScrollTop.current = top;
    setScrolled(top > 10);
    if (top <= 0 && prev > 0 && bounceClass === '') setBounceClass('animate-bounce-top');
    else if (top + el.clientHeight >= el.scrollHeight - 4 && prev < top && bounceClass === '') setBounceClass('animate-bounce-bottom');
  }

  const cartItems = products.filter(p => p.product_quantity > 0);
  const cartCount = cartItems.reduce((sum, p) => sum + p.product_quantity, 0);
  const orderSubtotal = cartItems.reduce((sum, p) => sum + p.unit_price * p.product_quantity, 0);
  const orderTotal = orderSubtotal + SERVICE_FEE;

  useEffect(() => {
    if (prevCartCount.current === 0 && cartCount === 1) {
      setCartPop(true);
      const t = setTimeout(() => setCartPop(false), 400);
      return () => clearTimeout(t);
    }
    prevCartCount.current = cartCount;
  }, [cartCount]);

  return (
    <div className="flex flex-col md:h-[100dvh] md:overflow-y-hidden bg-brand-cream">
      <Newsletter show={showNewsletter && !isMobile} onCloseButtonClick={handleClickNewsletter} />
      <Checkout show={showCheckout && !isMobile} updateShow={handleClickCheckout} productsList={products} handleDeleteCart={deleteCart} onCloseButtonClick={handleClickCheckout} handleConfirmation={handleShowConfirmation} handleError={handleshowCheckoutError} updateCheckoutResponse={setCheckoutResponse} />
      <MobileNewsletterSheet show={showNewsletter && isMobile} onClose={handleClickNewsletter} />
      <MobileCheckoutSheet show={showCheckout && isMobile} onClose={handleClickCheckout} productsList={products} handleDeleteCart={deleteCart} handleConfirmation={handleShowConfirmation} handleError={handleshowCheckoutError} updateCheckoutResponse={setCheckoutResponse} />
      <AlertModal show={showConfirmation} onCloseButtonClick={handleShowConfirmation} message={checkoutResponse} />
      <AlertModal show={showCheckoutError} onCloseButtonClick={handleshowCheckoutError} message={checkoutResponse} />

      <header className={`sticky top-0 flex flex-grow-0 bg-white border-b border-brand-border px-4 md:px-8 items-center z-10 transition-all duration-300 ${scrolled ? 'h-[48px]' : 'h-[76px]'}`}>
        {/* Desktop header */}
        <div className="hidden md:flex flex-auto w-full  max-w-[1200px] mx-auto px-4 md:px-8 gap-0 md:gap-7 overflow-hidden">
          <div className="hidden md:flex items-center gap-[18px] flex-shrink-0">
            <img src={logo} alt="PanPan" className={`transition-all duration-300 ${scrolled ? 'h-8' : 'h-14'}`} />
            <div className="text-[10px] font-semibold tracking-[0.15em] uppercase text-brand-warm-gray pt-px">
              A neighborhood buying club
            </div>
          </div>
          <div className="hidden md:flex flex-1" />
          <div className="hidden md:block text-right text-[13px] leading-relaxed text-[#6B605A]">
            <div className="font-semibold text-brand-text-primary">Order by Wednesday at 10AM</div>
            <div>Fri 3–7PM · Sat 10–2PM · Third Wheel Cheese</div>
          </div>
        </div>
        {/* Mobile header */}
        <div className="flex flex-auto justify-between items-center md:hidden" >
          <img src={logo} alt="PanPan" className="md:hidden h-14" />
          <button onClick={handleClickNewsletter} className="inline md:hidden px-3 py-1.5 bg-brand-rose-light text-brand-text-primary text-sm rounded">
            Newsletter
          </button>
        </div>
      </header>

      {/* Mobile category select */}
      <MobileAislesNav categories={categories} activeFilter={filterOption} onSelect={selectFilter} searchQuery={searchQuery} onSearch={setSearchQuery} scrolled={scrolled} />

      <div className="flex flex-auto w-full  max-w-[1200px] mx-auto px-4 md:px-8 gap-0 md:gap-7 md:overflow-hidden">
        {/* Left sidebar – aisles */}
        <aside className="hidden md:flex flex-col w-48 flex-shrink-0 overflow-y-auto py-6" style={{ marginRight: 28 }}>
          <AislesNav Categories={categories} showMyCart={false} handleFilter={selectFilter} activeFilter={filterOption} />
          <div className="mt-5 pt-4 border-t border-brand-border">
            <button onClick={handleClickNewsletter} className="w-full px-3 py-2.5 bg-[#FDF7F5] border border-[#EAD5CE] rounded-lg text-[13px] font-medium text-[#8A3E2E] text-center hover:bg-brand-rose-light">
              📋 This week's newsletter
            </button>
          </div>
        </aside>

        {/* Center – product list */}
        <main ref={listRef} onScroll={handleListScroll} className="flex-1 min-w-0 md:overflow-y-auto pt-4 pb-24 md:py-8">
          <div className={bounceClass} onAnimationEnd={() => setBounceClass('')}>
            {/* Week label + heading (desktop) */}
            <div className="mb-5 hidden md:block">
              <div className="text-sm font-bold tracking-[0.1em] uppercase text-brand-rose mb-1.5">
                → Week of {weekLabel}
              </div>
              <div className="flex justify-between items-center">
                <h1 className="font-display text-2xl font-bold text-brand-text-primary">
                  {filterOption.replace(/^📦\s*/, '')}
                </h1>
                <span className="text-sm text-brand-warm-gray">
                  {products.filter(p => filterOption === '📦 All Products' || p.product_category === filterOption).length} items
                </span>
              </div>
            </div>
            {/* Search bar (desktop) */}
            <div className="hidden md:flex items-center bg-white border-[1.5px] border-brand-border rounded-lg px-3 gap-1.5 mb-4">
              <span className="text-brand-warm-gray text-[15px] flex-shrink-0 pointer-events-none">🔍</span>
              <input
                type="text"
                placeholder="Search this week's products…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 py-2.5 px-1 border-none outline-none text-sm bg-transparent text-brand-text-primary"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-brand-warm-gray text-xl leading-none px-1">×</button>
              )}
            </div>
            <ItemsGroup
              productsList={products.filter(
                (p) => (filterOption === '📦 All Products' || p.product_category === filterOption) &&
                  (!searchQuery || p.product_name.toLowerCase().includes(searchQuery.toLowerCase()))
              )}
              handleIncrement={(id) => updateProductQuantity(id, 'increase')}
              handleReduction={(id) => updateProductQuantity(id, 'reduce')}
            />
          </div>
        </main>

        {/* Right sidebar – cart */}
        <aside className="hidden md:flex flex-col w-64 flex-shrink-0 overflow-y-auto py-6" style={{ marginLeft: 28 }}>
          <CartPanel
            productsList={products}
            handleIncrement={(id) => updateProductQuantity(id, 'increase')}
            handleReduction={(id) => updateProductQuantity(id, 'reduce')}
            handleDeleteCart={deleteCart}
            clickOnCheckout={handleClickCheckout}
          />
        </aside>
      </div>

      {/* Mobile footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-brand-border shadow-[0_-2px_12px_rgba(26,21,20,0.08)] flex items-center gap-3 px-4 py-3 md:hidden z-50">
        <button className="flex-1 flex flex-col text-left" onClick={() => setShowMobileCart(true)}>
          <span className={`text-xs text-brand-warm-gray uppercase tracking-wide font-medium${cartPop ? ' animate-cart-pop' : ''}`}>
            {cartCount} {cartCount === 1 ? 'item' : 'items'}
          </span>
          <span className={`font-bold text-brand-text-primary${cartPop ? ' animate-cart-pop' : ''}`}>
            <NumericFormat value={orderTotal.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          </span>
        </button>
        <button
          className="bg-brand-rose text-white border-none rounded-lg px-5 py-3 text-sm font-semibold hover:bg-brand-terracotta"
          onClick={handleClickCheckout}
        >
          Checkout →
        </button>
      </div>

      {/* Mobile cart sheet */}
      {showMobileCart && (
        <MobileCartSheet
          productsList={products}
          handleIncrement={(id) => updateProductQuantity(id, 'increase')}
          handleReduction={(id) => updateProductQuantity(id, 'reduce')}
          handleDeleteCart={deleteCart}
          clickOnCheckout={handleClickCheckout}
          onClose={() => setShowMobileCart(false)}
        />
      )}

      {showConsentBanner && (
        <ConsentBanner
          isMobile={isMobile}
          onAccept={() => handleConsentResolved('accepted')}
          onDecline={() => handleConsentResolved('declined')}
        />
      )}
    </div>
  );
}

export default App;
