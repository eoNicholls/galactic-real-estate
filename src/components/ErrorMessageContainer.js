import React from 'react';


const ErrorMessageContainer = ({ props }) => {
  if (props.pricerange[0] >= props.pricerange[1]) {
    return (
        <div class='error-message-container'>
          <p class="error-message">
            Invalid price range. Please make sure the maximum is larger than the minimum.
          </p>
        </div>
    )
  } else {
    return null;
  }
}


export default ErrorMessageContainer;
