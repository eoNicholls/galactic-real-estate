import React from 'react';
import SearchField from './SearchField.js';
import SortField from './SortField.js';
import RangeField from './RangeField.js';
import ErrorMessageContainer from './ErrorMessageContainer.js';
import FilteredPlanetList from './FilteredPlanetList.js';
import KeywordSearch from '../utils/KeywordSearch.js';
import AdvancedFiltering from './AdvancedFiltering.js';


class FilterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      objects: props.objects,
      searchField: '',
      priceRange: [-Infinity, Infinity],
      sortMethod: (a, b) => b.props.props.dateAdded.valueOf() - a.props.props.dateAdded.valueOf(),
      searchTerms: new Map(),
      advancedFiltering: false,
      advancedFilteringFunctions: {}
    }
  }

  buffer = {
    searchField: '',
    priceRange: [-Infinity, Infinity],
    sortMethod: (a, b) => b.props.props.dateAdded.valueOf() - a.props.props.dateAdded.valueOf(),
    advancedFilteringFunctions: {}
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
      sortMethod: this.buffer.sortMethod,
      advancedFilteringFunctions: this.buffer.advancedFilteringFunctions
    });

    if (this.state.searchField !== '') searchTerms: KeywordSearch.parseSearchString(this.buffer.searchField)
  }

  sortMethods = {
    default: [
      'default',
      '-',
      (a, b) => b.props.props.dateAdded.valueOf() - a.props.props.dateAdded.valueOf()
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
    ],

    dateAscending: [
      'dateAscending',
      'date added (oldest first)',
      (a, b) => a.props.props.dateAdded.valueOf() - b.props.props.dateAdded.valueOf()
    ],

    dateDescending: [
      'dateDescending',
      'date added (most recent first)',
      (a, b) => b.props.props.dateAdded.valueOf() - a.props.props.dateAdded.valueOf()
    ]
  }

  onEnableAdvancedFilteringClick = () => {
    this.setState({ advancedFiltering: !this.state.advancedFiltering });
  }

  onAdvancedFilteringChange = (filteringFunctions) => {
    this.buffer.advancedFilteringFunctions = filteringFunctions;
  }


  render() {
    const {objects, searchField, sortMethod, priceRange, searchTerms, advancedFilteringFunctions} = this.state;

    const advancedFiltering = (this.state.advancedFiltering !== false)
      ? <AdvancedFiltering
          attributes='placeholder'
          onChange={this.onAdvancedFilteringChange}
        />
      : <></>

    return(
      <React.Fragment>
        <form>
          <SearchField props={this.onSearchFieldChange} />
          <SortField
            onChange={this.onSortFieldChange}
            sortMethods={this.sortMethods}
          />
          <RangeField
            onChange={this.onPriceFieldChange}
            label='Price from:'
            step='1000'
          />
          <input
            type='button'
            name='updateResults'
            value='Update Results'
            onClick ={this.onUpdateResultsClick}
          />
        </form>

        <button onClick={this.onEnableAdvancedFilteringClick}>Advanced Filters</button>
        <form>
          {advancedFiltering}
        </form>

        <div>
          <ErrorMessageContainer props={this.state}/>
        </div>

        <FilteredPlanetList
          planets={objects}
          searchTerms={searchTerms}
          sortMethod={sortMethod}
          priceRange={priceRange}
          advancedFilteringFunctions={advancedFilteringFunctions}
        />
      </React.Fragment>
    )
  }
}


export default FilterContainer;
