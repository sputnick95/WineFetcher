import React from 'react';
import PropTypes from 'prop-types';

const StarRating = ({ rating }) => {
  const starStyle = {
    color: '#ffc107',
    fontSize: '24px',
  };
  console.log(rating)

  const emptyStarStyle = {
    color: '#e4e5e9',
    fontSize: '24px',
  };

  const getStars = () => {
    let stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<i className="fas fa-star" style={starStyle} key={i}></i>);
      } else {
        stars.push(<i className="far fa-star" style={emptyStarStyle} key={i}></i>);
      }
    }

    return stars;
  };

  return <div>{getStars()}</div>;
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default StarRating;
