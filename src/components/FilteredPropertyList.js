import React from 'react';
import PropertyCard from './PropertyCard.js';


class FilteredPropertyList extends React.Component {
  render() {
    const properties = this.props.properties;
    const searchfield = this.props.searchfield;
    const pricerange = this.props.pricerange;


    const filteredProperties = properties.filter(property => {

      // check property price is in filtered range
      if (pricerange[0] < pricerange[1]) {
        if (!(pricerange[0] <= property.cost) || !(property.cost <= pricerange[1])) {
          return false
        }
      }

      // function to check if a given value contains the search string
      // used to check against each value of the given property
      const includesSearchfieldCheck = (value) => String(value).toLowerCase().includes(searchfield.toLowerCase());
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
      />
    });


    return (
      <div className='property-card-list'>
        {PropertyCardArray}
      </div>
    )
  }
}


export default FilteredPropertyList;
