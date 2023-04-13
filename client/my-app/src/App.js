import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";

//import components
import Header from './components/Header';
import Homepage from './components/Home';
import InventoryList from './components/InventoryList';
import ItemDetails from './components/ItemDetails';
import ShoppingCart from './components/ShoppingCart';
import LoginPage from './components/Login';
import SignUp from "./components/SignUp";

function App({userCart, setUserCart}) {
  const [wine_inventory, setWineInventory] = useState([])
  const [user, setUser] = useState({})
  const navigate = useNavigate();

  useEffect(()=>{
    fetch("http://localhost:3000/white_wines")
    .then(resp => resp.json())
    .then(data => setWineInventory(data))
  }, [])



  //login
  function handleLoginSubmit(event){
    event.preventDefault()
    const data ={
      username: event.target.username.value,
      password: event.target.password.value
    }

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(data => setUser(data))
    .then(() => navigate('/inventory'))
    .then(() => window.location.reload());
  }

  useEffect(()=>{
    fetch("/check_session").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);


  return (
    <div className="App">
      <Header userStatus={user} setUser={setUser} userCart={userCart} />
      <Routes>
        <Route
        element={<Homepage inventory={wine_inventory} />} exact path="/"/>
        {wine_inventory !== undefined ? <Route element={<InventoryList userCart={userCart} user={user} inventory={wine_inventory}/>} path="/inventory"/> : null}
        {wine_inventory !== undefined ? <Route element={<ItemDetails item_1_test={wine_inventory} />} path="/item-details" /> : null}
        {wine_inventory !== undefined ? <Route element={<ShoppingCart userCart={userCart} setUserCart={setUserCart} />} path='/shopping-cart/:id'  /> : null}
        <Route element={<LoginPage handleLoginSubmit={handleLoginSubmit} />} path="/login" />
        <Route element={<SignUp />} path="/signup" />
      </Routes>
    </div>
  );
}

export default App;
