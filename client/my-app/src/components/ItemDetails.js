import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


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


    useEffect(() => {
        if (selectedItem) {
          setRating(selectedItem.average_rating);
        }
      }, [selectedItem]);

    

    return(
        <>
            <h1>Item Summary</h1>
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
