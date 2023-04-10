import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';

function InventoryItem({wine, image, id}){



    function handleClick_ID(event) {
        // fetch(`http://localhost:3000/white_wines/${id}`)
        // .then(data => data.json())
        // .then(resp => console.log(resp))

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
                onClick={handleClick_ID}
            >   
                <Card.Img variant="top" src={image} style={{ maxWidth: '35%'}} className="mx-auto d-block"  />
                <Card.Body>
                    <Card.Title>{wine}</Card.Title>
                </Card.Body>
            </Card>
        ))}
        </>
    )
}

export default InventoryItem;
