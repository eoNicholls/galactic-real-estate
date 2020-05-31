import React from 'react';
import PlanetCard from './PlanetCard.js';
import ReactPaginate from 'react-paginate';
import Switch from './Switch.js';
import KeywordSearch from '../utils/KeywordSearch.js';
import DropdownSelector from './DropdownSelector.js';


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
      animateImage: true
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      searchTerms: props.searchTerms,
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

  onCardsPerPageSelect = (event) => {
    console.log(event.target.value);
    this.setState({ cardsPerPage: event.target.value });
  }

  render() {
    const {
      planets,
      cardsPerPage,
      currentPage,
      sortMethod,
      priceRange,
      animateImage,
      searchTerms
    } = this.state;

    const filteredPlanets = planets.filter(planet => {
      // check planet price is in filtered range
      if (priceRange[0] < priceRange[1]) {
        if (!(priceRange[0] <= planet.price) || !(planet.price <= priceRange[1])) {
          return false
        }
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

    const cardsPerPageOptions = [
      <option value={10} key={10}>10</option>,
      <option value={20} key={20}>20</option>,
      <option value={50} key={50}>50</option>,
      <option value={Infinity} key={Infinity}>All</option>
    ];


    return (
      <React.Fragment>
        <div className='list-options'>
          <Switch
            label='Animation'
            onClick={this.onToggleAnimationSwitch}
          />

          {Pagination}

          <DropdownSelector
            onChange={this.onCardsPerPageSelect}
            label="Cards per page:"
            options={cardsPerPageOptions}
          />
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
