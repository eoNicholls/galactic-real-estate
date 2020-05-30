import React from 'react';
import AstraeaCanvas from './AstraeaCanvas.js';
import SaveStar from './SaveStar.js';


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
      life: props.props.life,
      dateAdded: props.props.dateAdded,
      starred: false
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      animateImage: props.props.animateImage
    };
  }

  onSaveStarClick = () => {
    this.setState({ starred: !this.state.starred });
  }

  render() {
    const {
      animateImage,
      id,
      star,
      planet,
      price,
      diameter,
      averageTemperature,
      orbitalPeriod,
      dayLength,
      composition,
      atmosphere,
      water,
      life,
      dateAdded,
      starred
    } = this.state;

    const planetAttributeData = [
      [
        'Diameter',
        diameter,
        'km'
      ],
      [
        'Average Temperature',
        averageTemperature,
        String.fromCharCode(176)+'C'
      ],
      [
        'Orbital Period',
        orbitalPeriod,
        'Earth-years'
      ],
      [
        'Day Length',
        dayLength,
        'Earth-days'
      ],
      [
        'Composition',
        composition,
        ''
      ],
      [
        'Atmosphere',
        atmosphere,
        ''
      ],
      [
        'Water',
        water,
        ''
      ],
      [
        'Life',
        life,
        ''
      ],
      [
        'Price',
        price,
        ''
      ]
    ]

    let attributeTable = planetAttributeData.map((attribute) => {
      let tableRow =
        <tr key={attribute[0]}>
          <td><p>{attribute[0]}</p></td>
          <td><p>{attribute[1]} {attribute[2]}</p></td>
        </tr>
      return tableRow;
    })

    return (
      <div className='planet-card'>
        <p className='planet-card-child planet-name'>{star} {planet}.</p>

        <SaveStar starred={starred} onClick={this.onSaveStarClick}/>

        <table className='planet-card-child planet-attributes'>
          <tbody>
            {attributeTable}
          </tbody>
        </table>

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
