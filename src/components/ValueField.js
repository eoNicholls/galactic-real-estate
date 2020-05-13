import React from 'react';


const ValueField = () => {
  return (
    <div>
      <p>Value from:</p>
      <input type='number' name='minimum' placeholder='Min' />
      <p>to:</p>
      <input type='number' name='maximum' placeholder='Max' />
    </div>
  )
}


export default ValueField;
