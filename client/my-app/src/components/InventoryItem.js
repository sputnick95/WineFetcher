import React from 'react';
import Card from 'react-bootstrap/Card';

function InventoryItem({wine, image, id}){


    function handleClick(event) {
        //this gives me id
        console.log(id)
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
                <Card.Img variant="top" src={image} style={{ maxWidth: '35%'}} className="mx-auto d-block" onClick={handleClick} />
                <Card.Body>
                    <Card.Title>{wine}</Card.Title>
                </Card.Body>
            </Card>
        ))}
        </>
    )
}

export default InventoryItem;
