import React, {useState, useMemo, useEffect} from 'react';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


const Star = ({ starId, rating, onMouseEnter, onMouseLeave, onClick }) => {
    let styleClass = "star-rating-blank";
    if (rating && rating >= starId) {
      styleClass = "star-rating-filled";
    }
   
    return (
      <div
        className="star"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        <svg
          height="55px"
          width="53px"
          class={styleClass}
          viewBox="0 0 25 23"
          data-rating="1"
        >
          <polygon
            stroke-width="0"
            points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
          />
        </svg>
      </div>
    );
  };


function ItemDetails({selectedItem}){
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const stars = [1, 2, 3, 4, 5];

    useEffect(() => {
        if (selectedItem) {
          setRating(selectedItem.average_rating);
        }
      }, [selectedItem]);


    console.log(selectedItem?.average_rating)
    console.log(selectedItem)

    return(
        <>
            <h1>Item Summary</h1>
            <Container>
                <div className='item-details-div'>
                    <Col>
                        <div className='image-div'>
                            <img className='wine-img' src={selectedItem?.image}/>
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
                                            {stars.map((star, i) => (
                                            <Star
                                                key={i}
                                                starId={i}
                                                rating={hoverRating || rating}
                                                onMouseEnter={() => setHoverRating(i)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                onClick={() => setRating(i)}
                                            />
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <span>{selectedItem?.average_rating}</span>
                                    <span>{selectedItem?.number_of_reviews}</span>
                                </Row>
                                <a><u>Add Review</u></a>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <h4>Map</h4>
                        </div>
                    </Col>
                </div>
            </Container>
        </>
    )
}

export default ItemDetails;
