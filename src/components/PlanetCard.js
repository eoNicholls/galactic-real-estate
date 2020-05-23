import React from 'react';
import AstraeaCanvas from './AstraeaCanvas.js';


class PlanetCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animateImage: props.props.animateImage,
      id: props.props.id,
      star: props.props.star,
      planet: props.props.planet,
      price: props.props.price,
      diameter: props.props.diameter,
      averageTemperature: props.props.averageTemperature,
      orbitalPeriod: props.props.orbitalPeriod,
      dayLength: props.props.dayLength,
      composition: props.props.composition,
      atmosphere: props.props.atmosphere,
      water: props.props.water,
      life: props.props.life
    }
  }

  render() {
    const {
      animateImage,
      id,
      star,
      planet,
      size,
      price,
      diameter,
      averageTemperature,
      orbitalPeriod,
      dayLength,
      composition,
      atmosphere,
      water,
      life
    } = this.state;

    return (
      <div className='planet-card'>
        <p className='planet-card-child planet-name'>{star} {planet}.</p>

        <p className='planet-card-child planet-attributes'>
          Diameter: {diameter}km<br />
          Average Temperature: {averageTemperature}&deg;C<br />
          Orbital Period: {orbitalPeriod} Earth-years<br />
          Day Length: {dayLength} Earth-days<br />
          Composition: {composition}<br />
          Atmosphere: {atmosphere}<br />
          Water: {water}<br />
          Life: {life}<br />
          <br />
          £{price}
        </p>

        <p className='planet-card-child planet-description'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </p>

        <div className=' planet-card-child astraea-canvas-container'>
          <AstraeaCanvas id={id} animate={animateImage} />
        </div>
      </div>
    )
  }
}


export default PlanetCard;
