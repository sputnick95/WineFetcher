import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";

//import components
import Header from './components/Header';
import Homepage from './components/Home';
import InventoryList from './components/InventoryList';


function App() {
  const [wine_inventory, setWineInventory] = useState([])

  useEffect(()=>{
    fetch("http://localhost:3000/wines")
    .then(resp => resp.json())
    .then(data => setWineInventory(data))
  }, [])
  
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route
        element={<Homepage inventory={wine_inventory} />} exact path="/"/>
        {wine_inventory !== undefined ? <Route element={<InventoryList inventory={wine_inventory}/>} path="/inventory"/> : null}
      </Routes>
    </div>
  );
}

export default App;
