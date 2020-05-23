import React from 'react';


const ErrorMessageContainer = ({ props }) => {
  if (props.priceRange[0] >= props.priceRange[1]) {
    return (
        <div className='error-message-container'>
          <p className="error-message">
            Invalid price range. Please make sure the maximum is larger than the minimum.
          </p>
        </div>
    )
  } else {
    return null;
  }
}


export default ErrorMessageContainer;
