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
import Checkout from './components/Checkout';
import Orders from './components/Orders';
import Footer from './components/Footer';

function App({userCart, setUserCart}) {
  const [wine_inventory, setWineInventory] = useState([])
  const [user, setUser] = useState({})
  const [sub_total, setSubtotal] = useState(0)
  const [itemNumber, setItemNumber] = useState(0)
  const [selectedItem, setItem] = useState([])



  const navigate = useNavigate();

  useEffect(()=>{
    fetch(`/wine_inventory`)
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      setWineInventory(data)

      // format data to match wine inventory schema
      const formattedData = data.map((wine) => ({
        comments: wine.comments,
        wine_name: wine.wine,
        id: wine.id,
        image: wine.image,
        location: wine.location,
        price: wine.price,
        average_rating: wine.rating.average,
        number_of_reviews: wine.rating.reviews,
        stock: wine.stock,
        winery: wine.winery
      }));
      //send POST request to backend to add wine inventory data

      // fetch('/wine_inventory',{
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify(formattedData)
      // })
  
    })
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


  useEffect(() => {
    fetch(`/cart_user_id/${user.id}`)
    .then(resp => resp.json())
    .then(data => {setUserCart(data)})
    }, [user.id]);
    



    // setItemNumber(prev => userCart.map(object => object.quantity_ordered + prev))

  

    

  


  return (
    <div className="App">
      <Header itemNumber={itemNumber} setItemNumber={setItemNumber} userStatus={user} setUser={setUser} userCart={userCart} />
      <Routes>
        <Route element={<Homepage inventory={wine_inventory} />} exact path="/"/>
        {wine_inventory !== undefined ? <Route element={<InventoryList setItem={setItem} selectedItem={selectedItem} itemNumber={itemNumber} setItemNumber={setItemNumber} userCart={userCart} user={user} inventory={wine_inventory}/>} path="/inventory"/> : null}
        {wine_inventory !== undefined ? <Route element={<ItemDetails selectedItem={selectedItem} item_1_test={wine_inventory[0]} />} path="/item-details" /> : null}
        {wine_inventory !== undefined ? <Route element={<ShoppingCart sub_total={sub_total} setSubtotal={setSubtotal} userCart={userCart} setUserCart={setUserCart} />} path='/shopping-cart/:id'  /> : null}
        <Route element={<LoginPage handleLoginSubmit={handleLoginSubmit} />} path="/login" />
        <Route element={<SignUp />} path="/signup" />
        <Route element={<Checkout user={user} userCart={userCart} setUserCart={setUserCart} sub_total={sub_total} setSubtotal={setSubtotal} />} path="/checkout"  />
        <Route element={<Orders sub_total={sub_total} userCart={userCart} setSubtotal={setSubtotal} user={user} />} path='/your_orders' />
      </Routes>

      <Footer />

    </div>
  );
}

export default App;
