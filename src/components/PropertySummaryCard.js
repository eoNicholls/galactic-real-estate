import React from 'react';
import image from '../assets/placeholder-planet.png';


const PropertySummaryCard = ({ star, planet, size, cost }) => {
  return (
    <div className='summary-card'>
      <img alt={`${star} ${planet}`} src={image} className='summary-card-image summary-card-child' />
      <p className='summary-card-child'>
        {star} {planet}.<br />
        {size}.<br />
        £{cost}
      </p>
      <p className='summary-card-child summary-card-description'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit
        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum.
      </p>
    </div>
  )
}

export default PropertySummaryCard;
