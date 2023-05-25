import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import { useParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



//import component

import ShoppingCartItem from './ShoppingCartItem';

function ShoppingCart({userCart, setUserCart, sub_total, setSubtotal}){




    let subtotal = 0;
    for(let i =0; i<userCart.length; i++){
        subtotal += (userCart[i].price)*(userCart[i].quantity_ordered)
    }
    setSubtotal(subtotal)
    console.log(sub_total)


    return(
        <div className='cart_container'>  
            <Row >
                <Col>
                    <h2>Shopping Cart</h2>
                </Col>
                <Col className='price_header_text'>
                    <h6>Price</h6>
                </Col>
            </Row>
            <div > 
                <Container className='shopping-cart-container'>
                    {userCart.map(item => {
                        return (
                            <>
                                <ShoppingCartItem sub_total={sub_total} setSubtotal={setSubtotal} {...item} key={item.id} setUserCart={setUserCart} />
                            </>
                        )
                    })}
                </Container>
            </div>
            <Container className='subtotal_container'>
                <div className='subtotal_text'>
                    <h6><b>Subtotal: </b> $ {sub_total}</h6>
                    <Button href='/checkout' >Proceed to Checkout</Button>
                </div>
            </Container>
        </div>
    )
}   
export default ShoppingCart;
