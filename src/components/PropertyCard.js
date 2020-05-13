import React from 'react';
import image from '../assets/placeholder-planet.png';


const PropertyCard = ({ star, planet, size, cost }) => {
  return (
    <div className='property-card'>
      <img alt={`${star} ${planet}`} src={image} className='property-card-image property-card-child' />
      <p className='property-card-child'>
        {star} {planet}.<br />
        {size}.<br />
        £{cost}
      </p>
      <p className='property-card-child property-card-description'>
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

export default PropertyCard;
