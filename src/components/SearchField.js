import React from 'react';


const SearchField = ({ onSearchChange }) => {
  return <input
    type='text'
    placeholder='Search for keywords'
    onChange={onSearchChange}
  />
}

export default SearchField;
