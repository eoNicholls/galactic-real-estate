import React from 'react';
import PropertyCard from './PropertyCard.js';


class FilteredPropertyList extends React.Component {
  render() {
    const properties = this.props.properties;
    const searchfield = this.props.searchfield;


    const filteredProperties = properties.filter(property => {
      const includesSearchfield = (value) => String(value).toLowerCase().includes(searchfield.toLowerCase());
      let propertyValues = Object.values(property);
      let initialValue = includesSearchfield(propertyValues[0]);

      const reduceFunction = ((accumulator, currentValue) => {
        currentValue = includesSearchfield(currentValue);
        return currentValue || accumulator;
      });

      return propertyValues.reduce(
        reduceFunction,
        initialValue
      ) === true ? true : false;
    })


    let key = -1;
    const PropertyCardArray = filteredProperties.map((property, i) => {
      key += 1;
      return <PropertyCard
        star={filteredProperties[i].star}
        planet={filteredProperties[i].planet}
        size={filteredProperties[i].size}
        cost={filteredProperties[i].cost}
        key={key}
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
