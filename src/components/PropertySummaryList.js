import React from 'react';
import PropertySummaryCard from './PropertySummaryCard.js';

const PropertySummaryList = ({ properties }) => {
  const PropertySummaryCardArray = properties.map((property, i) => {
    return <PropertySummaryCard
      star={properties[i].star}
      planet={properties[i].planet}
      size={properties[i].size}
      cost={properties[i].cost}
    />
  });

  return (
    <div className='summary-card-list'>
      {PropertySummaryCardArray}
    </div>
  )
}

export default PropertySummaryList;
