import React from 'react';


const SortField = ({ onChange, compareFunctions }) => {
  return(
    <select onChange={onChange}>
      <option value='default'>-</option>
      <option value='costAscending'>Cost (low to high)</option>
      <option value='costDescending'>Cost (high to low)</option>
    </select>
  )
}


export default SortField;
