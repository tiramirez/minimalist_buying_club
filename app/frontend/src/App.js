import './App.css';
import React, { useEffect, useState } from 'react';
import ItemsGroup from './components/storeItemsGroup';
import AislesNav from './components/storeAisles';
import Summary from './components/orderSummary';
import Newsletter from './components/newsletterModal';

import fetchData, { ItemObject } from './api/fetchITems';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterOption, setfilterOption] = useState('all');
  const [showNewsletter, setShowNewsletter] = useState(true);

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
    fetchData()
      .then((data) => {
        console.log("DATA_App", data);
        data && setProducts(JSON.parse(data).Items.map((item) => { return new ItemObject(item) }));
        // console.log(products);
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

  function updateQuantityIncrease(productId) {
    // console.log("TRY TO INCREASE", productId)
    const newProducts = [...products]
    newProducts.filter(item => item.id === productId)[0].updateQuantityIncrease();
    setProducts(newProducts);
  }

  function updateQuantityReduce(productId) {
    console.log("TRY TO REDUCE", productId)
    const newProducts = [...products]
    newProducts.filter(item => item.id === productId)[0].updateQuantityReduce();
    setProducts(newProducts);
  }

  function selectFilter(aisleId) {
    setfilterOption(aisleId);
  }

  return (
    <div className="App">
      <Newsletter show={showNewsletter} onCloseButtonClick={handleClickNewsletter}/>
      <div className="App-header">
        <h2>PanPan</h2>
        <Summary productsList={products} />
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
