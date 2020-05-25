import React from 'react';
import PlanetCard from './PlanetCard.js';
import ReactPaginate from 'react-paginate';
import Switch from './Switch.js';


class FilteredPlanetList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsPerPage: 10,
      currentPage: 0,
      planets: props.planets,
      searchField: props.searchField,
      priceRange: props.priceRange,
      sortMethod: props.sortMethod,
      animateImage: true
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      searchField: props.searchField,
      priceRange: props.priceRange,
      sortMethod: props.sortMethod
    };
  }

  onPaginationClick = (page) => {
    this.setState({ currentPage: page.selected });
  }

  onToggleAnimationSwitch = () => {
    this.setState({ animateImage: !this.state.animateImage });
  }

  render() {
    const {
      planets,
      cardsPerPage,
      currentPage,
      searchField,
      sortMethod,
      priceRange,
      animateImage
    } = this.state;

    const filteredPlanets = planets.filter(planet => {
      // check planet price is in filtered range
      if (priceRange[0] < priceRange[1]) {
        if (!(priceRange[0] <= planet.price) || !(planet.price <= priceRange[1])) {
          return false
        }
      }

      // function to check if a given value contains the search string
      // used to check against each value of the given planet
      const includesSearchfieldCheck = (value) => String(value).toLowerCase().includes(searchField.toLowerCase());
      const planetValues = Object.values(planet);
      const initialValue = includesSearchfieldCheck(planetValues[0]);

      // function to reduce a planet to a boolean value depending on whether it contains the search string or not
      const reduceFunction = ((accumulator, currentValue) => {
        currentValue = includesSearchfieldCheck(currentValue);
        return currentValue || accumulator;
      });

      // reduce function is called here
      // initialValue is used to check against the first value in the planet
      return planetValues.reduce(
        reduceFunction,
        initialValue
      ) === true ? true : false;
    })

    let PlanetCardArray = filteredPlanets.map((planet, i) => {
      filteredPlanets[i].animateImage = animateImage;
      return <PlanetCard
        key={filteredPlanets[i].id}
        props={filteredPlanets[i]}
      />
    });

    // sorting
    PlanetCardArray.sort(sortMethod);

    // pagination
    const pageCount = Math.ceil(PlanetCardArray.length / cardsPerPage);
    const pageStartIndex = currentPage * cardsPerPage;
    PlanetCardArray = PlanetCardArray.splice(pageStartIndex, cardsPerPage);

    const Pagination = <ReactPaginate
      previousLabel={'previous'}
      nextLabel={'next'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={5}
      onPageChange={this.onPaginationClick}
      containerClassName={'pagination'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
      forcePage={currentPage}
    />


    return (
      <React.Fragment>
        <div className='list-options'>
          <Switch
            label='Animation'
            onClick={this.onToggleAnimationSwitch}
          />
          {Pagination}
        </div>

        <div className='planet-card-list'>
          {PlanetCardArray}
        </div>

        {Pagination}
      </React.Fragment>
    )
  }
}


export default FilteredPlanetList;
