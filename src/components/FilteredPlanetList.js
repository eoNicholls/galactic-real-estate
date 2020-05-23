import React from 'react';
import PlanetCard from './PlanetCard.js';
import SearchField from './SearchField.js';
import SortField from './SortField.js';
import PriceRangeField from './PriceRangeField.js';
import ErrorMessageContainer from './ErrorMessageContainer.js';
import ReactPaginate from 'react-paginate';



class FilteredPlanetList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planets: props.planets,
      searchField: '',
      priceRange: [-Infinity, Infinity],
      sortField: 'default',
      cardsPerPage: 10,
      currentPage: 0
    }

    this.buffer = {
      searchField: '',
      priceRange: [-Infinity, Infinity],
      sortField: 'default'
    }
  }

  onSearchFieldChange = (event) => {
    this.buffer.searchField = event.target.value;
  }

  onPriceFieldChange = (event) => {
    const target = event.target;
    const value = parseInt(target.value);
    const currentVR = this.buffer.priceRange;
    this.buffer.priceRange = (target.name === 'min')
                    ? [value, currentVR[1]]
                    : [currentVR[0], value];
  }


  onSortFieldChange = (event) => {
    this.buffer.sortField = event.target.value;
  }

  compareFunctions = {
    default: [
      'default',
      '-',
      (a, b) => 1
    ],

    priceAscending: [
      'priceAscending',
      'price (low to high)',
      (a, b) => a.props.props.price - b.props.props.price
    ],

    priceDescending: [
      'priceDescending',
      'price (high to low)',
      (a, b) => b.props.props.price - a.props.props.price
    ]
  }

  onUpdateResultsClick = () => {
    this.setState({
      searchField: this.buffer.searchField,
      priceRange: this.buffer.priceRange,
      sortField: this.buffer.sortField
    });
  }


  onPaginationClick = (page) => {
    this.setState({ currentPage: page.selected });
  }


  render() {
    const {planets, searchField, sortField, priceRange, cardsPerPage, currentPage} = this.state;

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
      let planetValues = Object.values(planet);
      let initialValue = includesSearchfieldCheck(planetValues[0]);

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
      filteredPlanets[i].animateImage = true;
      return <PlanetCard
        key={filteredPlanets[i].id}
        props={filteredPlanets[i]}
      />
    });

    // sorting
    PlanetCardArray.sort(this.compareFunctions[sortField][2]);

    // pagination
    let pageCount = Math.ceil(PlanetCardArray.length / cardsPerPage);
    let pageStartIndex = currentPage * cardsPerPage;
    PlanetCardArray = PlanetCardArray.splice(pageStartIndex, cardsPerPage);
    let Pagination = <ReactPaginate
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
      forcePage={this.state.currentPage}
    />


    return (
      <React.Fragment>
        <form>
          <SearchField props={this.onSearchFieldChange} />
          <SortField onChange={this.onSortFieldChange}
                    compareFunctions={this.compareFunctions}/>
          <PriceRangeField props={this.onPriceFieldChange} />
          <input
            type='button'
            name='updateResults'
            value='Update Results'
            onClick ={this.onUpdateResultsClick} />
        </form>

        <div>
          <ErrorMessageContainer props={this.state}/>
        </div>

        {Pagination}

        <div className='planet-card-list'>
          {PlanetCardArray}
        </div>

        {Pagination}
      </React.Fragment>
    )
  }
}


export default FilteredPlanetList;
