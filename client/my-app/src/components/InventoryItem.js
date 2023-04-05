import React from 'react';
import Card from 'react-bootstrap/Card';

function InventoryItem({wine, image}){

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
                <Card.Img variant="top" src={image} style={{ maxWidth: '35%'}} className="mx-auto d-block" />
                <Card.Body>
                    <Card.Title>{wine}</Card.Title>
                </Card.Body>
            </Card>
        ))}
        </>
    )
}

export default InventoryItem;
