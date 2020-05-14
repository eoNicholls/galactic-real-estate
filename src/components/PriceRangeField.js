import React from 'react';


const PriceRangeField = ({props}) => {
  return (
    <div>
      <p>Price from:</p>
      <input type='number' name='min' placeholder='Min' onChange={props} />
      <p>to:</p>
      <input type='number' name='max' placeholder='Max' onChange={props} />
    </div>
  )
}


export default PriceRangeField;
