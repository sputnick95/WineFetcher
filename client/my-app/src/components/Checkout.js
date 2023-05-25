import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import { useParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Checkout({user, userCart, sub_total, setSubtotal}){

    let subtotal = 0;
    for(let i =0; i<userCart.length; i++){
      subtotal += (userCart[i].price)*(userCart[i].quantity_ordered)}
    setSubtotal(prev => subtotal)
    
    //CHECK USERCART^^ MIGHT USE THAT INSTEAD OF THE FETCH/GET REQUEST BELOW

    //figure out price and test button
    function handleClickOrder(){

        userCart.map(item => {
            fetch(`/wine_inventory`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    wine_id: item.wine_id,
                    quantity_ordered: item.quantity_ordered
                })}) 
            .then(resp => resp.json())
        })

        fetch(`/cart_to_orders/${user.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'}})
        .then(resp => resp.json())

        fetch(`/cart_to_orders/${user.id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'}})
        .then(resp => resp.json())
    }



    return(
    <>
        <div>
            <h3><b>Checkout </b>({userCart.length} items)</h3>
        </div>
        <Container className='checkout-container' >
            <Row className='shipping-address-row' >
                <Col><h5><b>1 Shipping Address</b></h5></Col>
                <Col>
                    <h6>{user.username}</h6>
                    <p>{user.shippingaddress}</p>
                </Col>
                <Col>Change</Col>
            </Row>
            <Row className='payment-method-row' >
                <Col><h5><b>2 Payment Method</b></h5></Col>
                <Col>
                <img className='mastercard-img' src={"https://imageio.forbes.com/blogs-images/steveolenski/files/2016/07/Mastercard_new_logo-1200x865.jpg?format=jpg&width=960"} />
                <span> <b>MasterCard</b> Last 4 Digits {user.CreditCard} </span>
                <br/>
                <span>Billing address: {user.username}</span>
                <br/>
                <span> {user.shippingaddress}</span>
                </Col>
                <Col>Change</Col>
            </Row>
            <Row className='items-and-shipping-row' >
                <Col><h5><b>3 Items and Shipping</b></h5></Col>
                <Col>
                    {userCart.map(item => {
                        return(
                        <Row className='checkout-row' >
                            
                            <Col className='checkout-img-col' >
                                <img className='checkout-item-img' src={item.image} />
                            </Col>
                            <Col>
                                <p> <b>{item.wine_name}</b> </p>
                                <p>Price: ${item.price}</p>
                                <p>Qty: {item.quantity_ordered}</p>
                            </Col>

                        </Row>
                    )})}
                </Col>
                <Col>Review Order</Col>
            </Row>
            <Row>
                <Col></Col>
                <Col></Col>
                <Col>
                    <p><b>Subtotal: </b>$ {sub_total}</p>
                    <Button href='/your_orders' onClick={handleClickOrder} >Place Order</Button>
                </Col>
            </Row>
        </Container>
    </>
    )
}

export default Checkout;