import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import { useParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



//import component

import ShoppingCartItem from './ShoppingCartItem';

function ShoppingCart({userCart, setUserCart, sub_total, setSubtotal}){

    const { id } = useParams()

    useEffect(() => {
        fetch(`/cart_user_id/${id}`)
        .then(resp => resp.json())
        .then(data => {
            setUserCart(data)
            console.log(data)
            data.map(wine => setSubtotal(prev => prev + wine.price))
        })
    }, [])





    return(
        <>  
            <Row>
                <Col>
                    <h2>Shopping Cart</h2>
                </Col>
                <Col className='price_header_text'>
                    <h6>Price</h6>
                </Col>
            </Row>
            
            
            <div > 
                <Container className='shopping-cart'>
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
                    <h6><b>Subtotal: </b> $ {sub_total/2}</h6>
                </div>
            </Container>
        </>
    )
}   
export default ShoppingCart;
