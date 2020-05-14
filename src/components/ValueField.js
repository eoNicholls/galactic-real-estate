import React from 'react';


const ValueField = ({props}) => {
  return (
    <div>
      <p>Value from:</p>
      <input type='number' name='min' placeholder='Min' onChange={props} />
      <p>to:</p>
      <input type='number' name='max' placeholder='Max' onChange={props} />
    </div>
  )
}


export default ValueField;
