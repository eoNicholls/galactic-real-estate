import React from 'react';
// import image from '../assets/placeholder-planet.png';
import AstraeaCanvas from './AstraeaCanvas.js';


class PropertyCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      star: props.star,
      planet: props.planet,
      size: props.size,
      price: props.price,
      animateImage: props.animateImage
    }
  }

  render() {
    const { id, star, planet, size, price, animateImage } = this.state;

    return (
      <div className='property-card'>
        <div className='property-card-image property-card-child'>
          {/*<AstraeaCanvas id={id} animate={animateImage} />*/}
        </div>
        <p className='property-card-child'>
          {star} {planet}.<br />
          {size}.<br />
          £{price}
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
}


export default PropertyCard;
