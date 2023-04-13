import Button from 'react-bootstrap/Button';
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

function ShoppingCartItem({image, wine, winery, id, setUserCart}){

    function handleClickDelete(event){
        fetch(`/cart_item/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        setUserCart(prev => prev.filter(item => {
            return item.id !== id
        }))
    }

    return(
        <>
            <div className='shopping-cart-row'>
                <div className='img-div'> 
                    <img className='item-cart-image'  src={image !== undefined ? image : null} alt="Item Image" />
                </div>
                <div className='item-cart-summary-div'>
                    <div className='item-title'>
                        {wine !== undefined ? <h5> <b> {wine} </b> </h5> : null}
                    </div>
                    <div className='item-info'>
                        <span>Eligible fro FREE Shipping</span>
                        {winery !== undefined ? <p>Winery: {winery}</p> : null}
                        <Button onClick={handleClickDelete} className='remove-from-cart-button' >Remove from Cart</Button>
                    </div>
                </div>  
            </div>
        </>
    )
}

export default ShoppingCartItem;