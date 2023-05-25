import React, {useState, useEffect} from 'react';
import  Container from 'react-bootstrap/Container';
import  Row from 'react-bootstrap/Row'
import  Col from 'react-bootstrap/Col'

function Orders({user, userCart, setSubtotal, sub_total}){
    const [your_orders, setOrders] = useState([])
    let currentDate = new Date();

    currentDate.setDate(currentDate.getDate() + 14);
    let dateString = currentDate.toLocaleDateString();

    let subtotal = 0;
    for(let i =0; i<userCart.length; i++){
      subtotal += (userCart[i].price)*(userCart[i].quantity_ordered)}
    setSubtotal(prev => subtotal)


    useEffect(() =>{
        fetch(`/orders/${user.id}`)
            .then(resp => resp.json())
            .then(data => setOrders(data))
    },[user.id])

        
    //stylize


    return(
        <>
            <div>
                <h4>Your Orders</h4>
            </div>
            <Container  className='order-container' style={{maxWidth: '60%'}} >
                <Row style={{ backgroundColor: 'lightblue' }} >
                    <Col>
                        <p>ORDER PLACED: {your_orders[0]?.time_of_order}</p>
                    </Col>
                    <Col>
                    </Col>
                    <Col>
                    
                    </Col>
                </Row>
                <Row>
                    <span>Delivary Estimate: <b>In 2 Weeks {dateString}</b></span>
                </Row>
                {your_orders.map(item => {
                    return(
                        <Row className='order-item-row' >
                            <Col md={2} className="p-1" >
                                <img className='order-images' src={item.image} />
                            </Col>
                            <Col md={2} >
                                <p> {item.wine_name} </p>
                                <p>$ {item.price}</p>
                                <span>{item.winery}</span>
                            </Col>
                        </Row>
                    )
                })}
            </Container>
        </>
    )
}

export default Orders;




