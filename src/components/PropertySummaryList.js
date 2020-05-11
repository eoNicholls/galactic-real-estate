import React from 'react';
import PropertySummaryCard from './PropertySummaryCard.js';


const PropertySummaryList = ({ properties }) => {

  let key = -1;
  const PropertySummaryCardArray = properties.map((property, i) => {
    key += 1;
    return <PropertySummaryCard
      star={properties[i].star}
      planet={properties[i].planet}
      size={properties[i].size}
      cost={properties[i].cost}
      key={key}
    />
  });

  return (
    <div className='summary-card-list'>
      {PropertySummaryCardArray}
    </div>
  )
}

export default PropertySummaryList;
