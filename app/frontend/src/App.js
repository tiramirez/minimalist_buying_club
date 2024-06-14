import './App.css';
import React, { useEffect, useState } from 'react';
import ItemsGroup from './components/storeItemsGroup';
import AislesNav from './components/storeAisles';
import Summary from './components/orderSummary';

import myItems from './api/fetchITems';

function App() {
  // const [items] = useProductList();
  // const items = myItems;
  console.log('APP', myItems);
  const [products, setProducts] = useState(myItems);
  
  // function updateQuantity(value) {
    //   this.product_quantity = value;
    //   // setProducts();
    // }
    
    function updateQuantityIncrease(productId) {
      console.log("TRY TO REDUCE", productId)
      // items.filter(item => item.id === productId));
      // item.updateQuantityIncrease();
      // this.product_quantity = this.product_quantity + 1;
    // setProducts();
  }

  function updateQuantityReduce(productId) {
    console.log("TRY TO INCREASE", productId)
    // if (this.product_quantity > 0) {
    //   this.product_quantity = this.product_quantity - 1;
    //   // setProducts();
    // }
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
