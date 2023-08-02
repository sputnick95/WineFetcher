import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Form from 'react-bootstrap/Form'

import MapComponent from './MapComponent';
import Comment from './Comment';
import Wine_Winery_Card from './Winery_sug_card';


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



function ItemDetails({selectedItem, user, wine_inventory}){

    const [rating, setRating] = useState(0);
    const stars = [1, 2, 3, 4, 5];
    const [comment_data, setComments] = useState([])
    const [new_comment, setNewCom] = useState(null)

    useEffect(() => {
        if (selectedItem) {
          setRating(selectedItem.average_rating);
        }

        fetch(`/comments_by_wine/${selectedItem.wine_id}`)
        .then(response => response.json())
        .then(data => {setComments(data)})}, [selectedItem]);


    function handleChange(event){
      
      setNewCom(prev => event.target.value)
    }

    function handleClick(event){
      event.preventDefault()

      const new_comment_obj = {
        comment: new_comment,
        likes: 0,
        dislikes: 0,
        user_id: user.id,
        wine_id: selectedItem.wine_id
      }

      fetch(`/comments_by_wine/${selectedItem.wine_id}`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(new_comment_obj)
      })
        .then(resp => resp.json())
        .then(data => setComments(prev => [...prev, data]))
    }

    
    const filtered_winery_card = wine_inventory.filter(wine => wine.winery === selectedItem.winery)
    console.log(filtered_winery_card)
    
    return(
        <>
            <h1>Item Summary</h1>
            <div>
                <div  className='item-details-container'>
                  <div className='item-details-div'>
                    <div className='item-detail-box'>
                          <div className='image-div'>
                              <img className='wine-img' src={selectedItem?.image} alt=''/>
                          </div>
                          <div className='item-summary'>
                              <div className='item-title'>
                                  <h4>{selectedItem?.wine_name}</h4>
                              </div>
                              <div className='item-descr'>
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
                                  {/* <a><u>Add Review</u></a> */}
                              </div>
                          </div>
                      </div>
                      <div className='map-box-container' >
                        <div className='map-div-box'>
                            <h4>Winery Location</h4>
                            <MapComponent
                              winery={selectedItem.winery}
                            />
                        </div>
                        <div className='wine-winery-card-scrollbar'>
                          <div className='scrollbar-div-container'>
                            {filtered_winery_card.map(wine_card => (
                              <Wine_Winery_Card key={wine_card.id} wine_card={wine_card}/>))}
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
            <div className='comments-container'>
              <div className='comment-section-headline' >
                <h2>Community Reviews</h2>
              </div>
              <div className='comments-section-container'>
                    {comment_data.map((data) => (
                      <Comment
                        id={data.id}
                        data={data}
                        user={user}
                        comment_data={comment_data}
                        setComments={setComments}
                      />
                    ))}
              </div>
              <div className='add-a-comment-container'>
                <div className='add-a-comment-form-section'>
                  <Form className='comments-form'>
                    <Form.Group controlId='comment'>
                      <Form.Label></Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2} // Adjust the number of rows as needed
                        placeholder='Add a Comment'
                        onChange={handleChange}
                        value={new_comment}
                      />
                    </Form.Group>
                  </Form>
                  <ButtonToolbar>
                    <Button 
                      variant="primary" 
                      type='submit' 
                      className='custom-rounded-button'
                      onClick={handleClick}
                      >

                        Add Comment

                    </Button>
                  </ButtonToolbar>                    
                </div>
              </div>
              
            </div>
        </>
    )
}



export default ItemDetails;

