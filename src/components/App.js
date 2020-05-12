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
      const includesSearchfield = (value) => String(value).toLowerCase().includes(searchfield.toLowerCase());
      let propertyValues = Object.values(property);
      let initialValue = includesSearchfield(propertyValues[0]);

      return propertyValues.reduce(
        (accumulator, currentValue) => {
          currentValue = includesSearchfield(currentValue);
          return currentValue || accumulator;
        },
        initialValue
      ) === true ? true : false;
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
