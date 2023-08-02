import React, {useState, useEffect} from 'react';

const Winery_sug_card = ({wine_card}) =>{
    console.log(wine_card)



    return(
        <>
            <div className='scrollbar-div-card'>
                <img src={wine_card.image} />
                <span>{wine_card.wine_name}</span>
                <span>${wine_card.price}</span>
            </div>
        </>
    )
}

export default Winery_sug_card