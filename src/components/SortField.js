import React from 'react';


const SortField = ({ onChange, compareFunctions }) => {

  const options = Object.keys(compareFunctions).map((entry) => {
    let id = compareFunctions[entry][0];
    let text = compareFunctions[entry][1];
    return <option value={id} key={id}>{text}</option>;
  });

  return(
    <select onChange={onChange}>
      {options}
    </select>
  )
}


export default SortField;
