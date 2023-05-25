import Button from 'react-bootstrap/Button';
import React, {useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

function ShoppingCartItem({image, wine_name, winery, id, setUserCart, price, sub_total, setSubtotal, quantity_ordered}){

    function handleClickDelete(event){
        fetch(`/cart_item/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        setUserCart(prev => prev.filter(item => {
            setSubtotal(prev => prev - item.price)
            return (item.id !== id)
        }))
        window.location.reload();
    }




    return(
        <>
            <Row className='shopping-cart-row'>
                <Col className='img-div'> 
                    <img className='item-cart-image'  src={image !== undefined ? image : null} alt="Item Image" />
                </Col>
                <Col className='item-cart-summary-div'>
                    <div className='item-title'>
                        {wine_name !== undefined ? <h5> <b> {wine_name} </b> </h5> : null}
                    </div>
                    <div className='item-info'>
                        <span>Eligible FREE Shipping</span>
                        {winery !== undefined ? <p>Winery: {winery}</p> : null}
                        <p>Qty: {quantity_ordered}</p>
                        <Button onClick={handleClickDelete} className='remove-from-cart-button' >Remove from Cart</Button>
                    </div>
                </Col>  
                <Col className='price_text'>
                    {price !== undefined ? <p>$ {price}</p> : null}
                </Col>
            </Row>
        </>
    )
}

export default ShoppingCartItem;
