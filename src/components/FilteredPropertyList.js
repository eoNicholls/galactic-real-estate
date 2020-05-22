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
    console.log(this.buffer.priceRange);
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
      (a, b) => a.props.price - b.props.price
    ],

    priceDescending: [
      'priceDescending',
      'price (high to low)',
      (a, b) => b.props.price - a.props.price
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
        animateImage={true}
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

        <div className='property-card-list'>
          {PropertyCardArray}
        </div>

        {Pagination}
      </React.Fragment>
    )
  }
}


export default FilteredPropertyList;
