import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import infoIcon from './info_icon.png';
import { RiCloseLine } from 'react-icons/ri';



const Modal_for_order = (props) => {
    const [quantity_ordered, setQuantity] = useState('')

    function handleClick_cart (event){


        const new_item_to_cart = {
            wine_name: props.modalDetails.wine_name,
            winery: props.modalDetails.winery,
            image: props.modalDetails.image,
            user_id: props.modalDetails.user_id,
            location: props.modalDetails.location,
            price: props.modalDetails.price,
            quantity_ordered: parseInt(quantity_ordered),
            number_of_reviews: props.modalDetails.number_of_reviews,
            average_rating: props.modalDetails.average_rating,
            wine_id: props.id
        }

        

                // GET request to check if new_item_to_cart already in Cart, if not, then POST, if else, then PATCH quantity ordered (implement on the frontend and the backend).
       
        fetch(`/cart_user_id/${props.modalDetails.user_id}`)
        .then(resp => resp.json())
        .then(data => {
            for(let i=0; i < data.length; i++){
                if(data[i].wine_id === (new_item_to_cart.wine_id)){
                    fetch(`/cart_user_id/${props.modalDetails.user_id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            wine_id: props.id,
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

        props.setShowToast(true);
        setTimeout(() => props.setShowToast(false), 3000);

        props.userCart.map(object => props.setItemNumber(prev => prev + object.quantity_ordered))



        console.log(new_item_to_cart)
        console.log(props.wine_name)

        props.setShowModal(false)


    }

    const handleChangeII = (event) => {
        const value = event.target.value
        setQuantity(value)
    }

    const handleClick_closeModal = (event) => {
        props.setShowModal(false)
    }

   

    return (
        <>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className='custom-modal'
            >
                    <RiCloseLine className='modal-close-button' onClick={handleClick_closeModal} />

                <Modal.Body>
                    <div className='modal_container' >
                        <div className='wine_img_div_left' >
                            <img className='wine_img' src={props.modalDetails.image} />  
                        </div>
                        <div className='wine_details_div_right' >
                            <div>
                                <h3>{props.modalDetails.wine_name}</h3>
                                
                            </div>
                            <div>
                                <p style={{ marginBottom: '0' }}>Price: ${props.modalDetails.price}</p>
                                <p style={{ marginBottom: '0' }}>Region: {props.modalDetails.location}</p>
                                <p style={{ marginBottom: '0' }}>Winery: {props.modalDetails.winery}</p>
                            </div>
                            <div>
                                <div className='quanitity-label'>
                                    Quantity:
                                </div>
                                <input 
                                    defaultValue="1" 
                                    min='1' 
                                    max="9999" 
                                    size="4" 
                                    type="number"
                                    value={quantity_ordered}
                                    onChange={handleChangeII}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClick_cart}  >Add to Cart</Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}

function InventoryItem({wine_name, image, id, winery, user, location, price, stock, number_of_reviews, average_rating, setShowToast, setItemNumber, itemNumber, userCart, selectedItem, setItem}){
    
    const [inv, setInv] = useState([])
    const [showmodal, setShowModal] = useState(false)
    const [modalDetails, setModalDetails] = useState([])

    const navigate = useNavigate();

    console.log(id)


    function handleClickItem(event){
        const clicked_item = {
            wine_name: wine_name,
            winery: winery,
            image: image,
            user_id: user.id,
            location: location,
            price: price,
            number_of_reviews: number_of_reviews,
            average_rating: average_rating,
            wine_id: id
        }
        setItem(clicked_item)
        navigate('/item-details')
    }


    // function handleChange(event){
    //     setQuantity(event.target.value)
    // }


    function handleClick_modal(event) {
        event.preventDefault()
        const modal_info = {
            wine_name: wine_name,
            winery: winery,
            image: image,
            user_id: user.id,
            location: location,
            price: price,
            number_of_reviews: number_of_reviews,
            average_rating: average_rating,
            wine_id: id
        }
        
        setModalDetails(prev => modal_info)
        setShowModal(prev => !prev)

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
                id='card'
            >   

                <Card.Img onClick={handleClickItem} variant="top" src={image} style={{ maxWidth: '35%'}} className="mx-auto d-block"  />
                <Card.Body>
                        <Row className='card-title-row'>
                            <Card.Title>{wine_name}</Card.Title>
                        </Row>
                        <Row className='Inventory-button-quantity' >
                            <Col>
                                {inv.stock > 0 ? 
                                <>
                                    <Button className='add-to-cart-button' onClick={handleClick_modal} rounded>Click to Add</Button> 
                                    <h4>$ {price}</h4>
                                </>
                                : null}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {inv.stock > 0 ? null: 
                                <div className='out-of-stock-container' >
                                    <img className='info-icon' src={infoIcon} />
                                    <p>This product is temporarily out of stock because of high demand, we will replenish as soon as possible.</p>
                                </div>
                                }
                            </Col>
                        </Row>
                </Card.Body>
            </Card>
        ))}
        <Modal_for_order
            show={showmodal}
            setShowModal={setShowModal}
            modalDetails={modalDetails}
            price = {price}
            number_of_reviews = {number_of_reviews}
            average_rating={average_rating}
            id={id}
            stock={stock}
            setShowToast={setShowToast}
            setItemNumber={setItemNumber}
            itemNumber={itemNumber}
            userCart={userCart}
        />
        </>
    )
}

export default InventoryItem;

