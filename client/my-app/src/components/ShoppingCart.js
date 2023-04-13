import React, {useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';

//import component

import ShoppingCartItem from './ShoppingCartItem';

function ShoppingCart({userCart, setUserCart}){

    const { id } = useParams()

    useEffect(() => {
        fetch(`/cart_user_id/${id}`)
        .then(resp => resp.json())
        .then(data => setUserCart(data))
    }, [])




    return(
        <>  
            <h2>Shopping Cart</h2>
            
            <div> 
                <div className='shopping-cart'>
                    {userCart.map(item => {
                        return (
                            <ShoppingCartItem {...item} key={item.id} setUserCart={setUserCart} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}   
export default ShoppingCart;
