import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom';

function InventoryItem({wine_name, image, id, winery, user, location, price, stock, number_of_reviews, average_rating, setShowToast, setItemNumber, itemNumber, userCart, selectedItem, setItem}){
    const [quantity_ordered, setQuantity] = useState('')
    const [inv, setInv] = useState([])
    const navigate = useNavigate();

    function handleClickItem(event){
        const clicked_item = {
            wine_name: wine_name,
            winery: winery,
            image: image,
            user_id: user.id,
            location: location,
            price: price,
            quantity_ordered: parseInt(quantity_ordered),
            number_of_reviews: number_of_reviews,
            average_rating: average_rating,
            wine_id: id
        }
        setItem(clicked_item)
        navigate('/item-details')
    }

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
            quantity_ordered: parseInt(quantity_ordered),
            number_of_reviews: number_of_reviews,
            average_rating: average_rating,
            wine_id: id
        }
        // GET request to check if new_item_to_cart already in Cart, if not, then POST, if else, then PATCH quantity ordered (implement on the frontend and the backend).
        fetch(`/cart_user_id/${user.id}`)
        .then(resp => resp.json())
        .then(data => {
            for(let i=0; i < data.length; i++){
                if(data[i].wine_id === (new_item_to_cart.wine_id)){
                    fetch(`/cart_user_id/${user.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            wine_id: id,
                            quantity_ordered: parseInt(quantity_ordered)
                        })
                    })
                    .then(resp => resp.json())
                    return;
                }
            }

            fetch(`/new_cart_item`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(new_item_to_cart)
            })
                .then(resp => resp.json())
        })

        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);

        userCart.map(object => setItemNumber(prev => prev + object.quantity_ordered))
    };

    useEffect(() => {
        fetch(`/wine_inventory/${id}`)
        .then(resp => resp.json())
        .then(data => setInv(data))
    },[])

    
    

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

                <Card.Img onClick={handleClickItem} variant="top" src={image} style={{ maxWidth: '35%'}} className="mx-auto d-block"  />
                <Card.Body>
                    <Card.Title>{wine_name}</Card.Title>
                    <Form >
                        <Row className='Inventory-button-quantity' >
                            <Col>
                                {inv.stock > 0 ? <Button className='add-to-cart-button' onClick={handleClick_ID}>Add to Cart</Button> : null}
                            </Col>
                            {inv.stock > 0 ? <Col>
                                <Form.Label>Quantity:</Form.Label>
                                <Form.Control type="number" placeholder="Enter #" className='quantity-ordered' value={quantity_ordered} onChange={handleChange} />
                            </Col> : null}
                        </Row>
                    </Form>
                    <Row>
                        <Col>
                            {inv.stock > 0 ? <p> In Stock </p> : <img className='out-of-stock-img-card' src={'https://cdn.vectorstock.com/i/preview-1x/03/07/grunge-red-out-of-stock-word-rubber-seal-stamp-vector-39240307.jpg'} />}
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
