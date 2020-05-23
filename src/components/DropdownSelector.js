import React from 'react';


const DropdownSelector = ({ onChange, label, options }) => {
  return(
    <div>
      <label>{label}<br />
        <select onChange={onChange}>
          {options}
        </select>
      </label>
    </div>
  )
}


export default DropdownSelector;
