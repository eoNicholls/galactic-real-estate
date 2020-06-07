import React from 'react';

/*
the options prop should be an array of <option> objects
*/
const DropdownSelector = ({ onChange, label, options }) => {
  return(
    <div className='filter-field dropdown-selector'>
      <label>{label}<br />
        <select onChange={onChange}>
          {options}
        </select>
      </label>
    </div>
  )
}


export default DropdownSelector;
