import React from 'react';
import PropertyCard from './PropertyCard.js';
import SearchField from './SearchField.js';
import SortField from './SortField.js';
import PriceRangeField from './PriceRangeField.js';
import ErrorMessageContainer from './ErrorMessageContainer.js';



class FilteredPropertyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: props.properties,
      searchField: '',
      priceRange: [-Infinity, Infinity],
      sortField: 'default'
    }
  }

  onSearchFieldChange = (event) => {
    this.setState({ searchfield: event.target.value });
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

    costAscending: [
      'costAscending',
      'Cost (low to high)',
      (a, b) => a.props.cost - b.props.cost
    ],

    costDescending: [
      'costDescending',
      'Cost (high to low)',
      (a, b) => b.props.cost - a.props.cost
    ]
  }


  render() {
    const {properties, searchField, sortField, priceRange} = this.state;

    const filteredProperties = properties.filter(property => {
      // check property price is in filtered range
      if (priceRange[0] < priceRange[1]) {
        if (!(priceRange[0] <= property.cost) || !(property.cost <= priceRange[1])) {
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


    const PropertyCardArray = filteredProperties.map((property, i) => {
      return <PropertyCard
        key={filteredProperties[i].id}
        id={filteredProperties[i].id}
        star={filteredProperties[i].star}
        planet={filteredProperties[i].planet}
        size={filteredProperties[i].size}
        cost={filteredProperties[i].cost}
        animateImage={false}
      />
    }).sort(this.compareFunctions[sortField][2]);

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
        <div className='property-card-list'>
          {PropertyCardArray}
        </div>
      </React.Fragment>
    )
  }
}


export default FilteredPropertyList;
