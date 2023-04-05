import React from 'react';
import Card from 'react-bootstrap/Card';


function InventoryItem(){

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
                <Card.Body>
                    <Card.Title>Test2</Card.Title>
                </Card.Body>
            </Card>
        ))}
        </>
    )
}

export default InventoryItem;
