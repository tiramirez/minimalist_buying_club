import './App.css';
import React, { Component }  from 'react';
import ItemsGroup from './components/storeItemsGroup';
import AislesNav from './components/storeAisles';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        PanPan
      </header>
        <body className="App-body">
          <div className='left-column'>
            <AislesNav />
          </div>
          <div className='main-column'>
            <ItemsGroup />
          </div>
        </body>
    </div>
  );
}

export default App;
