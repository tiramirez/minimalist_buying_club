import './App.css';
import React, { useEffect, useState } from 'react';
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
  
  const [checkoutResponse, setCheckoutResponse] = useState({'title':'','body':''});
  const [showConfirmation, updateShowConfirmation] = useState(false);
  const [showCheckoutError, updateShowCheckoutError] = useState(false);
  const [showMyCart, updateShowMyCart] = useState(false);

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
  function fetchDataApp() {
    fetchData('products_list.json')
    .then((data) => {
      data && setProducts(JSON.parse(data).Items
        .map((item) => {return new ItemObject(item)})
        );

      data && cookies['active-cart'] && setProducts(
        JSON.parse(data).Items
          .map((item) => {return new ItemObject(item)})
          .map((item) => {
            if (cookies['active-cart'].some((cItem) => item['id'] === cItem['id'])) {
              item.product_quantity = cookies['active-cart'].filter(citem => citem.id ===item.id)[0].product_quantity;
            }
            return item;
          })
        );
    })
    // .catch((error) => {
    //   error && console.log(error.toJSON());
    // });
  }

  function fetchCategories() {
    const categoriesArray = ['📦 All Products'];
    products.forEach((item) => {
      let aux_category = item.product_category;
      if (!categoriesArray.includes(aux_category)) {categoriesArray.push(aux_category)};
      setCategories(categoriesArray.map((item, index) => ({ id: index + 1, name: item })));
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
    }
  }

  const filterMyCart = () => {
    selectFilter('📦 All Products');
    updateShowMyCart(!showMyCart);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Newsletter show={showNewsletter} onCloseButtonClick={handleClickNewsletter} />
      <Checkout show={showCheckout} productsList={products} handleDeleteCart={deleteCart} onCloseButtonClick={handleClickCheckout} handleConfirmation={handleShowConfirmation} handleError={handleshowCheckoutError} updateCheckoutResponse={setCheckoutResponse} />
      <AlertModal show={showConfirmation} onCloseButtonClick={handleShowConfirmation} message={checkoutResponse}/>
      <AlertModal show={showCheckoutError} onCloseButtonClick={handleshowCheckoutError} message={checkoutResponse}/>
      
      <header className="bg-white p-0 md:p-4">
        <div className="container mx-auto felx flex-col md:flex md:flex-row justify-between md:items-center w-full md:w-3/4">
          <img src={logo250} alt="Logo" className="h-40 hidden md:inline"/>
          <Summary productsList={products} showMyCart={showMyCart} handleMyCart={filterMyCart} handleDeleteCart={deleteCart} clickOnCheckout={handleClickCheckout} />
          <button onClick={handleClickNewsletter} className="inline md:hidden md:mt-4 w-full px-4 py-2 bg-blue-300 hover:bg-blue-700 text-left">Open Newsletter</button>
        </div>
      </header>
      
      <div className="flex flex-col w-screen mx-0 md:flex md:flex-row md:mx-auto md:w-3/4">
        <aside className="p-2 w-screen bg-orange-400 md:w-80 md:p-4 md:bg-white md:rounded-lg shadow-md h-4/5">
          <AislesNav Categories={categories} showMyCart={showMyCart} handleFilter={selectFilter} />
          <button onClick={handleClickNewsletter} className="md:inline hidden mt-4 w-full px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-700">Open Newsletter</button>
        </aside>
        
        <main className="w-full h-1/5 md:w-2/3 p-1 md:p-4 flex-col">
          {showMyCart?
            <h2 className="text-xl font-semibold py-2 md:inline-flex hidden">Order detail</h2>
            :
            <h2 className="text-xl font-semibold py-2 md:inline-flex hidden">Items List &gt; {filterOption}</h2>
          }
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
        </main>
      </div>
    </div>
  );
}

export default App;
