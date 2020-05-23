import React from 'react';
import DropdownSelector from './DropdownSelector.js';


const SortField = ({ onChange, compareFunctions }) => {

  const label = "Sort properties by:"

  const options = Object.keys(compareFunctions).map((entry) => {
    let id = compareFunctions[entry][0];
    let text = compareFunctions[entry][1];
    return <option value={id} key={id}>{text}</option>;
  });

  return(
    <React.Fragment>
      <DropdownSelector
        onChange={onChange}
        label={label}
        options={options} />
    </React.Fragment>
  )
}


export default SortField;
