import React from 'react';
import PlanetCard from './PlanetCard.js';
import ReactPaginate from 'react-paginate';
import Switch from './Switch.js';
import KeywordSearch from '../utils/KeywordSearch.js';


class FilteredPlanetList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsPerPage: 10,
      currentPage: 0,
      planets: props.planets,
      searchTerms: props.searchTerms,
      priceRange: props.priceRange,
      sortMethod: props.sortMethod,
      advancedFilteringFunctions: props.advancedFilteringFunctions,
      animateImage: true
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      searchTerms: props.searchTerms,
      priceRange: props.priceRange,
      sortMethod: props.sortMethod,
      advancedFilteringFunctions: props.advancedFilteringFunctions
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
      sortMethod,
      priceRange,
      animateImage,
      searchTerms,
      advancedFilteringFunctions
    } = this.state;

    const filteredPlanets = planets.filter(planet => {
      // check planet price is in filtered range
      if (priceRange[0] < priceRange[1]) {
        if (!(priceRange[0] <= planet.price) || !(planet.price <= priceRange[1])) {
          return false
        }
      }

      // advanced filtering check
      const afKeys = Object.keys(advancedFilteringFunctions);
      if (afKeys.length > 0) {
        const advancedFilteringCheck = afKeys.every(key => {
            const func = advancedFilteringFunctions[key];
            return func(planet[key]);
        })
        if (advancedFilteringCheck === false) return false;
      }

      // check searchTerms against planet attributes
      return (searchTerms.size > 0)
        ? KeywordSearch.checkObject(planet, searchTerms)
        : true
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

    // card count
    const planetCardArrayLength = PlanetCardArray.length;
    const cardCount = <p className='card-count'>{planetCardArrayLength} results</p>

    // pagination
    const pageCount = Math.ceil(planetCardArrayLength / cardsPerPage);
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
          {cardCount}
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
