import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Form from 'react-bootstrap/Form'
import {Provider, UpdownButton} from '@lyket/react';

import MapComponent from './MapComponent';


const Star = ({ starId, rating }) => {
  const styleClass =
    rating && rating - starId > 1
      ? "star-rating-filled"
      : rating && rating - starId >= 0.5
      ? "half-star-rating"
      : "star-rating-blank";

  return (
    <div className="star">
      <svg
        height="55px"
        width="53px"
        className={styleClass}
        viewBox="0 0 25 23"
        data-rating="1"
      >
        <defs>
          <clipPath id="halfStarClip">
            <polygon points="0,0 9.7,0 10.5,23 0,23" />
          </clipPath>
        </defs>
        <polygon
          strokeWidth="0"
          points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
          clipPath={styleClass === "half-star-rating" ? "url(#halfStarClip)" : undefined}
        />
      </svg>
    </div>
  );
};



function ItemDetails({selectedItem}){


    const [rating, setRating] = useState(0);
    const stars = [1, 2, 3, 4, 5];
    const [comment_data, setComments] = useState([])

    useEffect(() => {
        if (selectedItem) {
          setRating(selectedItem.average_rating);
        }

        
        
        fetch(`/comments_by_wine/${selectedItem.wine_id}`)
        .then(response => response.json())
        .then(data => {setComments(data)})}, [selectedItem]);

    console.log(comment_data[1]?.user.username)

    

    
    
    return(
        <>
            <h1>Item Summary</h1>
            <div>
            <Container>
                <div className='item-details-div'>
                    <Col>
                        <div className='image-div'>
                            <img className='wine-img' src={selectedItem?.image} alt=''/>
                        </div>
                    </Col>
                    <Col>
                        <div className='item-summary'>
                            <div className='item-title'>
                                <h4>{selectedItem?.wine_name}</h4>
                            </div>
                            <div className='item-descr'>
                                <Row>
                                    <div>
                                       <span>Average Rating: </span>
                                       <div class="star-container">
                                            {stars.map((star,i) => (
                                                // work through the code here!!!!!!
                                            <Star
                                                key={i}
                                                starId={i}
                                                rating={rating}
                                            />
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <span>{selectedItem?.average_rating}</span>
                                    <span>{selectedItem?.number_of_reviews}</span>
                                </Row>
                                {/* <a><u>Add Review</u></a> */}
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <h4>Map</h4>
                        <MapComponent
                        address={selectedItem.winery}
                        />
                    </Col>
                </div>
            </Container>
            </div>
            <div className='comments-container'>
              <div className='comment-section-headline' >
                <h2>Community Reviews</h2>
              </div>
              <div className='add-a-comment-container'>
                <div className='add-a-comment-button'>
                  <Form>
                    <Form.Group controlId='comment'>
                      <Form.Label></Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        // value={null}
                        // onChange={null}
                      />
                    </Form.Group>
                  </Form>
                  <ButtonToolbar>
                    <Button variant="primary" type='submit' className='custom-rounded-button'>Add Comment</Button>
                  </ButtonToolbar>                    
                </div>
                <div className='add-a-comment'>

                </div>
              </div>
              <div className='comments-section-container'>
                    {comment_data.map((data) => (


                      <div className='comment-bubble' key={data.id}>
                        <div>{data.comment}</div>
                        <div>
                          <h5>{data.user !== null ? data.user.username: "Unregistered  User"}</h5>
                          <div className='updown-button-container'>
                            <Provider
                              apiKey='pt_06995f6822f19f436ad8c3101f32d2'
                              theme={{
                                colors: {
                                  background: "#b8fff3",
                                  text: "violet",
                                  primary: "rgba(255, 224, 138, 0.4)"
                                }
                              }}
                              
                            >
                              <UpdownButton/>
                            </Provider>
                          </div>
                          
                        </div>
                      </div>
                      
                    ))}
              </div>
              
            </div>
        </>
    )
}



export default ItemDetails;
