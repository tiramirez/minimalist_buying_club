import './App.css';
import React, { useEffect, useState } from 'react';
import ItemsGroup from './components/storeItemsGroup';
import AislesNav from './components/storeAisles';
import Summary from './components/orderSummary';

import myItems from './api/fetchITems';

function App() {
  const [products, setProducts] = useState(myItems);
  
  function updateQuantity(value,productId) {
    console.log("TRY TO UPDATE", productId)
    const newProducts = [...products]
    newProducts.filter(item => item.id === productId)[0].updateQuantityReduce(value);
    setProducts(newProducts);
  }
      
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

  return (
    <div className="App">
      <div className="App-header">
        <h2>PanPan</h2>
        <Summary Items={myItems} />
      </div>
      <div className="App-body">
        <div className='left-column'>
          <AislesNav />
        </div>
        <div className='main-column'>
          <ItemsGroup Items={myItems} handleIncrement={updateQuantityIncrease} handleReduction={updateQuantityReduce}/> //  onUpdate=updateQuantity
        </div>
      </div>
    </div>
  );
}

export default App;
