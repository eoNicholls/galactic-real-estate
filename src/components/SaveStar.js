import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SaveStar = ({ starred, onClick }) => {

  const icon = starred
    ? ['fas', 'star']
    : ['far', 'star']

  return (
    <button className='save-star-button' onClick={onClick}>
      <FontAwesomeIcon className='save-star' icon={icon} />
    </button>
  )
}

export default SaveStar;
