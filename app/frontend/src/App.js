import './App.css';
import React, { useEffect, useState } from 'react';
import ItemBox from './components/storeItemsGroup';
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
    console.log(products);
    products.filter(item => item.id === productId)[0].product_quantity += 1;
    console.log(products.filter(item => item.id === productId)[0].product_quantity);
    // item.updateQuantityIncrease();
    // this.product_quantity = this.product_quantity + 1;
    setProducts(products);
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
        <Summary Items={products} />
      </div>
      <div className="App-body">
        <div className='left-column'>
          <AislesNav />
        </div>
        <div className='main-column'>
          <h2>Items List</h2>
          {products.map((singleItem) => (
            <ItemBox key={singleItem.id} Item={singleItem} onIncrement={updateQuantityIncrease} onReduction={updateQuantityReduce} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
