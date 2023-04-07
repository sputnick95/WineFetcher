import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function ItemDetails({item_1_test}){
    


    return(
        <>
            <h1>Item Summary</h1>
            <div className='item-details-div'>
                
                <div className='image-div'>
                    <img className='wine-img' src={item_1_test.image}/>
                </div>
                <div className='item-summary'>
                    <div className='item-title'>
                        <h5>{item_1_test.wine}</h5>
                        <br/>
                    </div>
                    <div className='item-descr'>
                        <Row>
                            <Col>
                                <p>Average Rating: {item_1_test.rating.average}</p>
                            </Col>
                            <Col>
                                <span>Reviews: {item_1_test.rating.reviews}</span>
                            </Col>
                        </Row>
                        <Button>Add Review</Button>
                        <br/>
                        <br/>
                        <p>Winery: {item_1_test.winery}</p>
                        
                    </div>
                        <Form className='quantity-form'></Form>
                            <Form.Group>
                                <Form.Label>Quantity:</Form.Label>
                                <input maxLength={3}/>
                            </Form.Group>
                                <br/>
                            <Button>Add to Cart</Button>
                </div>
                
            </div>
        </>
    )
}

export default ItemDetails;

