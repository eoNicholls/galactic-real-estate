import React from 'react';
import PropertySummaryList from './PropertySummaryList.js';
import jsonData from '../assets/data.json';

const App = () => {
  const properties = JSON.parse(JSON.stringify(jsonData));

  return (
    <React.Fragment>
      <h1>Galactic Real Estate Agency</h1>
      <PropertySummaryList properties={properties} />
    </React.Fragment>
  )
}

export default App;
