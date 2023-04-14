import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup';
import { Image } from 'react-bootstrap';

function InventoryItem({wine_name, image, id, winery, user, location, price, stock}){
    const [quantity_ordered, setQuantity] = useState('')
 
    function handleChange(event){
        setQuantity(event.target.value)
    }

    function handleClick_ID(event) {
        event.preventDefault()
        const new_item_to_cart = {
            wine_name: wine_name,
            winery: winery,
            image: image,
            user_id: user.id,
            location: location,
            price: price,
            quantity_ordered: parseInt(quantity_ordered)
        }
        console.log(new_item_to_cart)

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
                    <Card.Title>{wine_name}</Card.Title>
                    <Form >
                        <Row className='Inventory-button-quantity' >
                            <Col>
                                <Button className='add-to-cart-button' onClick={handleClick_ID}>Add to Cart</Button>
                            </Col>
                            <Col>
                                <Form.Label>Quantity:</Form.Label>
                                <Form.Control type="number" placeholder="Enter #" className='quantity-ordered' value={quantity_ordered} onChange={handleChange} />
                            </Col>
                        </Row>
                    </Form>
                    <Row>
                        <Col>
                            {stock > 0 ? "In Stock" : "Out of Stock"}
                        </Col>
                        <Col>
                            Price: ${price}
                        </Col>
                    </Row>

                </Card.Body>
            </Card>
        ))}
        </>
    )
}

export default InventoryItem;
