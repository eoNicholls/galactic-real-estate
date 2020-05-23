import React from 'react';
import SearchField from './SearchField.js';
import SortField from './SortField.js';
import PriceRangeField from './PriceRangeField.js';
import ErrorMessageContainer from './ErrorMessageContainer.js';
import FilteredPlanetList from './FilteredPlanetList.js';


class FilterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      objects: props.objects,
      searchField: '',
      priceRange: [-Infinity, Infinity],
      sortMethod: (a, b) => 1
    }
  }

  buffer = {
    searchField: '',
    priceRange: [-Infinity, Infinity],
    sortMethod: (a, b) => 1
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
    this.buffer.sortMethod = this.sortMethods[event.target.value][2];
  }

  onUpdateResultsClick = () => {
    this.setState({
      searchField: this.buffer.searchField,
      priceRange: this.buffer.priceRange,
      sortMethod: this.buffer.sortMethod
    });
  }

  sortMethods = {
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


  render() {
    const {objects, searchField, sortMethod, priceRange} = this.state;
    return(
      <React.Fragment>
        <form>
          <SearchField props={this.onSearchFieldChange} />
          <SortField onChange={this.onSortFieldChange}
                    sortMethods={this.sortMethods}/>
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

        <FilteredPlanetList
          planets={objects}
          searchField={searchField}
          sortMethod={sortMethod}
          priceRange={priceRange} />
      </React.Fragment>
    )
  }
}


export default FilterContainer;
