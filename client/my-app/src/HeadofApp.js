import App from './App'
import React, {useState} from 'react'

function HeadofApp(){
    const [userCart, setUserCart] = useState([])


    return(
        <>
        <App userCart={userCart} setUserCart={setUserCart} />
        </>
    )
}

export default HeadofApp
