import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";

//import components
import Header from './components/Header';
import Homepage from './components/Home';
import InventoryList from './components/InventoryList';
import ItemDetails from './components/ItemDetails';
import ShoppingCart from './components/ShoppingCart';




function App() {
  const [wine_inventory, setWineInventory] = useState([])
  const [item_details, setItemDetails] = useState({})

  useEffect(()=>{
    fetch("http://localhost:3000/wines")
    .then(resp => resp.json())
    .then(data => setWineInventory(data))
  }, [])

  let ww_item_test;
  if (wine_inventory.white_wines!== undefined){
    console.log(wine_inventory.white_wines[0])
    ww_item_test = wine_inventory.white_wines[0]
  }

  console.log(ww_item_test)

  //why do i get an infinite-loop after using useState???

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route
        element={<Homepage inventory={wine_inventory} />} exact path="/"/>
        {wine_inventory !== undefined ? <Route element={<InventoryList inventory={wine_inventory}/>} path="/inventory"/> : null}
        {ww_item_test !== undefined ? <Route element={<ItemDetails item_1_test={ww_item_test} />} path="/item-details" /> : null}
        <Route
        element={<ShoppingCart/>} path='/shopping-cart'
        />
      </Routes>
    </div>
  );
}

export default App;
