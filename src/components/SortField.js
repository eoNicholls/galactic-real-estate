import React from 'react';


const SortField = ({ onChange, compareFunctions }) => {

  const options = Object.keys(compareFunctions).map((entry) => {
    let id = compareFunctions[entry][0];
    let text = compareFunctions[entry][1];
    return <option value={id} key={id}>{text}</option>;
  });

  return(
    <div>
      <label>Sort properties by:</label>
      <select onChange={onChange}>
        {options}
      </select>
    </div>
  )
}


export default SortField;
