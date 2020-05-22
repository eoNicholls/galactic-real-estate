import React from 'react';
import PropertyCard from './PropertyCard.js';
import SearchField from './SearchField.js';
import SortField from './SortField.js';
import PriceRangeField from './PriceRangeField.js';
import ErrorMessageContainer from './ErrorMessageContainer.js';
import ReactPaginate from 'react-paginate';



class FilteredPropertyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: props.properties,
      searchField: '',
      priceRange: [-Infinity, Infinity],
      sortField: 'default',
      cardsPerPage: 10,
      currentPage: 0
    }
  }

  static getDerivedStateFromProps(props, state) {
    return { pageCount: Math.ceil(props.properties.length / state.cardsPerPage) };
  }

  onSearchFieldChange = (event) => {
    this.setState({ searchField: event.target.value });
  }

  onPriceFieldChange = (event) => {
    const target = event.target;
    const value = parseInt(target.value);
    const currentVR = this.state.priceRange;
    this.setState(target.name === 'min'
                    ? {priceRange: [value, currentVR[1]]}
                    : {priceRange: [currentVR[0], value]});
  }


  onSortFieldChange = (event) => {
    this.setState({ sortField: event.target.value });
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
      (a, b) => a.props.price - b.props.price
    ],

    priceDescending: [
      'priceDescending',
      'price (high to low)',
      (a, b) => b.props.price - a.props.price
    ]
  }


  handlePageClick = (page) => {
    this.setState({ currentPage: page.selected });
  }


  render() {
    const {properties, searchField, sortField, priceRange, cardsPerPage, currentPage} = this.state;

    const filteredProperties = properties.filter(property => {
      // check property price is in filtered range
      if (priceRange[0] < priceRange[1]) {
        if (!(priceRange[0] <= property.price) || !(property.price <= priceRange[1])) {
          return false
        }
      }

      // function to check if a given value contains the search string
      // used to check against each value of the given property
      const includesSearchfieldCheck = (value) => String(value).toLowerCase().includes(searchField.toLowerCase());
      let propertyValues = Object.values(property);
      let initialValue = includesSearchfieldCheck(propertyValues[0]);

      // function to reduce a property to a boolean value depending on whether it contains the search string or not
      const reduceFunction = ((accumulator, currentValue) => {
        currentValue = includesSearchfieldCheck(currentValue);
        return currentValue || accumulator;
      });

      // reduce function is called here
      // initialValue is used to check against the first value in the property
      return propertyValues.reduce(
        reduceFunction,
        initialValue
      ) === true ? true : false;
    })

    let PropertyCardArray = filteredProperties.map((property, i) => {
      return <PropertyCard
        key={filteredProperties[i].id}
        id={filteredProperties[i].id}
        star={filteredProperties[i].star}
        planet={filteredProperties[i].planet}
        size={filteredProperties[i].size}
        price={filteredProperties[i].price}
        animateImage={false}
      />
    });

    // sorting
    PropertyCardArray.sort(this.compareFunctions[sortField][2]);

    // pagination
    let pageCount = Math.ceil(PropertyCardArray.length / cardsPerPage);
    let pageStartIndex = currentPage * cardsPerPage;
    PropertyCardArray = PropertyCardArray.splice(pageStartIndex, cardsPerPage);
    let Pagination = <ReactPaginate
      previousLabel={'previous'}
      nextLabel={'next'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={5}
      onPageChange={this.handlePageClick}
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
        </form>

        <div>
          <ErrorMessageContainer props={this.state}/>
        </div>

        {Pagination}

        <div className='property-card-list'>
          {PropertyCardArray}
        </div>

        {Pagination}
      </React.Fragment>
    )
  }
}


export default FilteredPropertyList;
