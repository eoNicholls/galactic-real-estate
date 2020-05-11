import React from 'react';
import image from '../assets/placeholder-planet.png';


const PropertySummaryCard = ({ star, planet, size, cost }) => {
  return (
    <div className='summary-card'>
      <img alt={`${star} ${planet}`} src={image} className='summary-card-image' />
      <p>
        {star} {planet}.<br />
        {size}.<br />
        £{cost}
      </p>
    </div>
  )
}

export default PropertySummaryCard;
