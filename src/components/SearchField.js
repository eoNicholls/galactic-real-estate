import React from 'react';


const SearchField = ({ props }) => {
  return (
    <label> Search for keywords:<br />
      <input
        type='text'
        placeholder='Search'
        onChange={props} />
    </label>
  )
}

export default SearchField;
