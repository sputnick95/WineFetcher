import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup';
import { Image } from 'react-bootstrap';

function InventoryItem({wine, image, id, winery, user}){



    function handleClick_ID(event) {
        

        
        const new_item_to_cart = {
            wine_name: wine,
            winery: winery,
            image: image,
            user_id: user.id
        }

        fetch(`/new_cart_item`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(new_item_to_cart)
        })
            .then(resp => resp.json())
    }
    

    return(
        <>
        {['Light',].map((variant) => (
            <Card 
                bg={variant.toLowerCase()}
                border="Light"
                key = {variant}
                text='Dark'
                style={{ width: '18rem' }}
                className="mb-2"
                
            >   
                <Card.Img variant="top" src={image} style={{ maxWidth: '35%'}} className="mx-auto d-block"  />
                <Card.Body>
                    <Card.Title>{wine}</Card.Title>
                    <Row className='Inventory-button-quantity' >
                        <Col>
                            <Button className='add-to-cart-button' onClick={handleClick_ID} >Add to Cart</Button>
                        </Col>
                        <Col>
                            <Form.Label>Quantity:</Form.Label>
                            <Form.Control />
                        </Col>
                    </Row>

                </Card.Body>
            </Card>
        ))}
        </>
    )
}

export default InventoryItem;
