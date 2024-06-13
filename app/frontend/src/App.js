import './App.css';
import React, { useState } from 'react';
import ItemBox from './components/storeItemsGroup';
import AislesNav from './components/storeAisles';
import Summary from './components/orderSummary';
import ItemsList from './api/fetchITems';

function App() {
  // console.log('APP', ItemsList);
  const [products, setProducts] = useState(ItemsList);

  // function updateQuantity(value) {
  //   this.product_quantity = value;
  //   // setProducts();
  // }
      
  function updateQuantityIncrease(productId) {
    // console.log("TRY TO INCREASE", productId)
    const newProducts = [...products]
    newProducts.filter(item => item.id === productId)[0].updateQuantityIncrease();
    setProducts(newProducts);
    }
    
  function updateQuantityReduce(productId) {
      // console.log("TRY TO REDUCE", productId)
      const newProducts = [...products]
      newProducts.filter(item => item.id === productId)[0].updateQuantityReduce();
      setProducts(newProducts);
  }

  return (
    <div className="App">
      <div className="App-header">
        <h2>PanPan</h2>
        <Summary productsList={products} />
      </div>
      <div className="App-body">
        <div className='left-column'>
          <AislesNav />
        </div>
        <div className='main-column'>
          <h2>Items List</h2>
          {products.map((singleItem) => (
            <ItemBox key={singleItem.id} Item={singleItem} onIncrement={()=>updateQuantityIncrease(singleItem.id)} onReduction={()=>updateQuantityReduce(singleItem.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
