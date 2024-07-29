import './App.css';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import ItemsGroup from './components/storeItemsGroup';
import AislesNav from './components/storeAisles';
import Summary from './components/orderSummary';
import Newsletter from './components/newsletterModal';

import fetchData, { ItemObject } from './api/fetchITems';
import Checkout from './components/checkoutModal';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterOption, setfilterOption] = useState('all');
  const [showNewsletter, setShowNewsletter] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [cookies, setCookie] = useCookies('active-cart');

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
    fetchData('sample_productsV2.json')
      .then((data) => {
        // console.log("DATA_App", data);
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
      });
  }

  function fetchCategories() {
    const categoriesArray = [];
    products.forEach((item) => {
      let aux_category = item.product_category;
      if (!categoriesArray.includes(aux_category)) {categoriesArray.push(aux_category)};
      setCategories(categoriesArray.map((item, index) => ({ id: index + 1, name: item })));
    });
  }

  function handleClickNewsletter() {
    setShowNewsletter(!showNewsletter);
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
  }

  function selectFilter(aisleId) {
    setfilterOption(aisleId);
  }

  return (
    <div className="App">
      <Newsletter show={showNewsletter} onCloseButtonClick={handleClickNewsletter}/>
      <Checkout show={showCheckout} productsList={products} handleDeleteCart={deleteCart}onCloseButtonClick={handleClickCheckout}/>
      <div className="App-header">
        <h2>PanPan</h2>
        <Summary productsList={products} handleDeleteCart={deleteCart} clickOnCheckout={handleClickCheckout} />
      </div>
      <div className="App-body">
        <div className='left-column'>
          <AislesNav Categories={categories} handleFilter={selectFilter} />
          <button onClick={handleClickNewsletter}>Open Newsletter</button>
        </div>
        <div className='main-column'>
          <h2>Items List > {filterOption}</h2>
          <ItemsGroup
            productsList={products.filter((singleProduct) => singleProduct.product_category === filterOption | filterOption === 'all')}
            handleIncrement={updateQuantityIncrease} handleReduction={updateQuantityReduce} />
          {/* //  onUpdate=updateQuantity */}
        </div>
      </div>
    </div>
  );
}

export default App;
