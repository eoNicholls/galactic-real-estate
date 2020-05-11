import React from 'react';

const PropertySummaryCard = ({ star, planet, size, cost }) => {
  return (
    <div className="summary-card">
      <p>
        {star} {planet}.<br />
        {size}.<br />
        £{cost}
      </p>
    </div>
  )
}

export default PropertySummaryCard;
