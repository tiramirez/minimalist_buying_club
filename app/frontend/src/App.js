import './App.css';
import React  from 'react';
import ItemsGroup from './components/storeItemsGroup';
import AislesNav from './components/storeAisles';
import Summary from './components/orderSummary';

import myItems from './api/fetchITems';

function App() {
  // console.log('APP',myItems);

  return (
    <div className="App">
      <div className="App-header">
        <h2>PanPan</h2>
        <Summary />
      </div>
        <div className="App-body">
          <div className='left-column'>
            <AislesNav />
          </div>
          <div className='main-column'>
            <ItemsGroup  items={myItems}/>
          </div>
        </div>
    </div>
  );
}

export default App;
