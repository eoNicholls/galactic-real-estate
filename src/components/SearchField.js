import React from 'react';


const SearchField = ({ props }) => {
  return <input
    type='text'
    placeholder='Search for keywords'
    onChange={props}
  />
}

export default SearchField;
