import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";

function App() {
  const [wine_inventory, setWineInventory] = useState({})

  useEffect(()=>{
    fetch("http://localhost:3000/white_wines")
    .then(resp => resp.json())
    .then(data => setWineInventory(data))
  }, [])
  
  console.log(wine_inventory)

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
