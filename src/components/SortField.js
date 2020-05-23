import React from 'react';
import DropdownSelector from './DropdownSelector.js';


const SortField = ({ onChange, sortMethods }) => {

  const label = "Sort planets by:"

  const options = Object.keys(sortMethods).map((entry) => {
    let id = sortMethods[entry][0];
    let text = sortMethods[entry][1];
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
