import React from 'react';
import PropertySummaryList from './PropertySummaryList.js';
import SearchField from './SearchField.js';

import jsonData from '../assets/data.json';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      properties: [],
      searchfield: ''
    }
  }

  componentDidMount() {
    this.setState({ properties: JSON.parse(JSON.stringify(jsonData)) });
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  }

  render() {
    const { properties, searchfield } = this.state;

    const filteredProperties = properties.filter(property => {
      return Object.values(property).reduce((accumulator, currentValue) => {

        accumulator = String(accumulator).toLowerCase().includes(searchfield.toLowerCase()) || accumulator;
        currentValue = String(currentValue).toLowerCase().includes(searchfield.toLowerCase());
        return currentValue || accumulator;

      }) === true ? true : false;
    })

    return (
      <React.Fragment>
        <header>
          <h1>Galactic Real Estate Agency</h1>
          <SearchField props={this.onSearchChange}/>
        </header>
        <main>
          <PropertySummaryList properties={filteredProperties} />
        </main>
      </React.Fragment>
    )
  }
}

export default App;
