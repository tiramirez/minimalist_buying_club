import './App.css';
import React, { useEffect, useState, useRef} from 'react';
import { useCookies } from 'react-cookie';
import ItemsGroup from './components/storeItemsGroup';
import AislesNav from './components/storeAisles';
import Summary from './components/orderSummary';
import Newsletter from './components/newsletterModal';


import logo250 from './static/panpan_logo250.svg';
import fetchData, { ItemObject } from './api/fetchITems';
import Checkout from './components/checkoutModal';
import AlertModal from "./components/confirmationModal";
import './output.css';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterOption, setfilterOption] = useState('📦 All Products');
  const [showNewsletter, setShowNewsletter] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies('active-cart');
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3; // Maximum number of retries
  
  const [checkoutResponse, setCheckoutResponse] = useState({'title':'','body':''});
  const [showConfirmation, updateShowConfirmation] = useState(false);
  const [showCheckoutError, updateShowCheckoutError] = useState(false);
  const [showMyCart, updateShowMyCart] = useState(false);
  const divRef = useRef();

  var refDate = new Date();
  refDate.setDate(refDate.getDate() + (7 - refDate.getDay()));
  // Sunday - Saturday : 0 - 6;

  useEffect(() => {
    fetchDataApp()
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [products]);

  // function updateQuantity(value,productId) {
  //   console.log("TRY TO UPDATE", productId)
  //   const newProducts = [...products]
  //   newProducts.filter(item => item.id === productId)[0].updateQuantityReduce(value);
  //   setProducts(newProducts);
  // }
  const retryFetch = () => {
    if (retryCount < maxRetries) {
      setTimeout(() => {
        setRetryCount(retryCount + 1);
        fetchDataApp();
      }, 2000); // Retry after 2 seconds
    } else {
      console.log('Max retries reached. Failed to fetch items.');
    }
  };

  async function fetchDataApp() {
    try {
      const resp = await fetchData('products_list.json')
      // if (resp.data && resp.data.length > 0) {
      if (resp) {
        setProducts(JSON.parse(resp).Items
          .map((item) => {return new ItemObject(item)})
          );

        cookies['active-cart'] && setProducts(
          JSON.parse(resp).Items
            .map((item) => {return new ItemObject(item)})
            .map((item) => {
              if (cookies['active-cart'].some((cItem) => item['id'] === cItem['id'])) {
                item.product_quantity = cookies['active-cart'].filter(citem => citem.id ===item.id)[0].product_quantity;
              }
              return item;
            })
          );

      } else {
        retryFetch();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function fetchCategories() {
    const categoriesArray = [];
    products.forEach((item) => {
      let aux_category = item.product_category;
      if (!categoriesArray.includes(aux_category)) {categoriesArray.push(aux_category)};
      categoriesArray.sort();
      setCategories(['📦 All Products',...categoriesArray].map((item, index) => ({ id: index + 1, name: item })));
    });
  }

  function handleClickNewsletter() {
    setShowNewsletter(!showNewsletter);
  };
  function handleShowConfirmation() {
    updateShowConfirmation(!showConfirmation);
  };
  function handleshowCheckoutError() {
    updateShowCheckoutError(!showCheckoutError);
  };
  function handleClickCheckout() {
    setShowCheckout(!showCheckout);
  };

  function updateQuantityIncrease(productId) {
    // console.log("TRY TO INCREASE", productId)
    const newProducts = [...products]
    newProducts.filter(item => item.id === productId)[0].updateQuantityIncrease();
    setProducts(newProducts);
    setCookie(
        'active-cart',
        JSON.stringify(newProducts.filter(item => item.product_quantity > 0)),
        {'expires': refDate}
    );
  }

  function updateQuantityReduce(productId) {
    // console.log("TRY TO REDUCE", productId)
    const newProducts = [...products]
    newProducts.filter(item => item.id === productId)[0].updateQuantityReduce();
    setProducts(newProducts);
    setCookie(
      'active-cart',
      JSON.stringify(newProducts.filter(item => item.product_quantity > 0)),
      {'expires': refDate}
    );
  }

  function deleteCart() {
    const newProducts = [...products]
    newProducts.map(item => item.updateQuantityReset());
    setProducts(newProducts);
    removeCookie('active-cart');
    if (showMyCart) {
      updateShowMyCart(false);
    }
  }

  function selectFilter(aisleId) {
    if (!showMyCart) {
      setfilterOption(aisleId);
      // Scroll back to top
      if (divRef.current) {
        window.scrollTo(0, divRef.current.offsetTop)
      }
    }
  }

  const filterMyCart = () => {
    selectFilter('📦 All Products');
    updateShowMyCart(!showMyCart);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Newsletter show={showNewsletter} onCloseButtonClick={handleClickNewsletter} />
      <Checkout show={showCheckout} updateShow={handleClickCheckout} productsList={products} handleDeleteCart={deleteCart} onCloseButtonClick={handleClickCheckout} handleConfirmation={handleShowConfirmation} handleError={handleshowCheckoutError} updateCheckoutResponse={setCheckoutResponse} />
      <AlertModal show={showConfirmation} onCloseButtonClick={handleShowConfirmation} message={checkoutResponse}/>
      <AlertModal show={showCheckoutError} onCloseButtonClick={handleshowCheckoutError} message={checkoutResponse}/>
      
      <header className="flex flex-grow-0 bg-white p-0 md:p-4 sticky top-0 md:relative">
        <div className="container mx-auto felx flex-col md:flex md:flex-row justify-between md:items-center w-full md:w-3/4">
          <img src={logo250} alt="Logo" className="h-40 hidden md:inline"/>
          <Summary productsList={products} showMyCart={showMyCart} handleMyCart={filterMyCart} handleDeleteCart={deleteCart} clickOnCheckout={handleClickCheckout} />
          <button onClick={handleClickNewsletter} className="inline md:hidden md:mt-4 w-full px-4 py-2 bg-blue-300 hover:bg-blue-700 text-left">Open Newsletter</button>
          <div className="flex md:hidden  bg-orange-400 border-y-4 border-orange-400">
          {showMyCart?<>Order details</>:
            <select 
              name="filterDropdown" id="filterDropdown"
              className='w-full bg-inherit text-white'
              onChange={(e) => {
                  console.log(e);
                  selectFilter(e.target.value);
                }}>
              {categories.map((aisle) => (
                <option key={aisle.id} id={aisle.id} className='bg-gray-100' value={aisle.name}>
                    {aisle.name}
                  </option>
              ))}
            </select>
          }
        </div>
        </div>
      </header>
      
      <div className="flex  flex-auto w-screen mx-0 md:mx-auto md:w-3/4 flex-grow" ref={divRef}>
        <aside className="md:inline hidden w-80 p-4 bg-white rounded-lg shadow-md h-4/5 sticky top-0">
          <AislesNav Categories={categories} showMyCart={showMyCart} handleFilter={selectFilter} />
          <button onClick={handleClickNewsletter} className="md:inline hidden mt-4 w-full px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-700">Open Newsletter</button>
        </aside>
        
        <main className="flex-1 w-full md:w-2/3 p-1 md:px-4 flex-col">
          {showMyCart?
            <h2 className="text-xl font-semibold py-2 md:inline-flex hidden">Order detail</h2>
            :
            <h2 className="text-xl font-semibold py-2 md:inline-flex hidden bg-gray-100 w-full sticky top-0">{filterOption}</h2>
          }
          <div className="">
            <ItemsGroup
              productsList={
                products
                .filter((singleProduct) => filterOption === '📦 All Products' || singleProduct.product_category === filterOption)
                .filter((singleProduct) => (!showMyCart ? true :singleProduct.product_quantity > 0) )
              }
              showMyCart={showMyCart}
              handleIncrement={updateQuantityIncrease} 
              handleReduction={updateQuantityReduce} 
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
