import React from 'react';


const PriceRangeField = ({ onChange, label, step }) => {

  // this function changes the number format from iii,iii,iii back to iiiiiiiii
  const fromLocaleString = function(value) {
    value = value.toString().split('');

    // this check prevents it crashing when passed an empty array
    // i.e. when the user deletes all their input
    if (value.length === 0){return '';}

    let result = value.reduce((acca, digit) => {
      if (digit === ','){return acca;}
      return acca.concat(digit);
    });

    return result;
  }


  const onChangeEvent = function(event) {
    let target = event.target;
    let value = fromLocaleString(target.value);

    // if the last character in the string isNaN: return the rest of the string
    // this simulates <input type='number' />
    // necessary because I cannot use <input type='number' /> as that won't allow commas
    if (isNaN(value.slice(-1))) {
      value = value.slice(0, -1);
    }

    // remove commas for the event value that is sent to App.onPriceFieldChange()
    event.target.value = value;
    onChange(event);

    // changes the value to a more readable format (including commas)
    if (value === '') {
      target.value = '';
    } else {
      target.value = parseInt(value).toLocaleString('en-GB');
    }
  }


  return (
    <div>
      <label>{label}</label>
      <input name='min' placeholder='Min' step={step} onChange={onChangeEvent} />
      <label>to:</label>
      <input name='max' placeholder='Max' step={step} onChange={onChangeEvent} />
    </div>
  )
}


export default PriceRangeField;
