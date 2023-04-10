import React from 'react';
import Button from 'react-bootstrap/Button';

function ShoppingCart({test}){
    
    console.log(test)

    return(
        <>  
            <h2>Shopping Cart</h2>
            
            <div> 
                <div className='shopping-cart'>
                    <div className='shopping-cart-row'>
                        <div className='img-div'> 
                            <img className='item-cart-image' src={test[0].image} />
                        </div>
                        <div className='item-cart-summary-div'>
                            <div className='item-title'>
                                <h5> <b> {test[0].wine} </b> </h5>
                            </div>
                            <div className='item-info'>
                                <span>Eligible fro FREE Shipping</span>
                                <p>Winery: {test[0].winery}</p>
                                <Button className='remove-from-cart-button' >Remove from Cart</Button>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        </>
    )
}   
export default ShoppingCart;
