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
      return (
        property.star.toLowerCase().includes(searchfield.toLowerCase())
        || property.planet.toLowerCase().includes(searchfield.toLowerCase())
        || property.size.toLowerCase().includes(searchfield.toLowerCase())
      )
    })

    return (
      <React.Fragment>
        <header>
          <h1>Galactic Real Estate Agency</h1>
          <SearchField onSearchChange={this.onSearchChange}/>
        </header>
        <main>
          <PropertySummaryList properties={filteredProperties} />
        </main>
      </React.Fragment>
    )
  }
}

export default App;
