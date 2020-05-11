import React from 'react';
import PropertySummaryList from './PropertySummaryList.js';
import SearchField from './SearchField.js';

import jsonData from '../assets/data.json';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      properties: []
    }
  }

  componentDidMount() {
    this.setState({ properties: JSON.parse(JSON.stringify(jsonData)) });
  }

  onSearchChange = (event) => {
    console.log(event.target.value);
  }

  render() {
    const { properties } = this.state;

    return (
      <React.Fragment>
        <header>
          <h1>Galactic Real Estate Agency</h1>
          <SearchField onSearchChange={this.onSearchChange}/>
        </header>
        <main>
          <PropertySummaryList properties={properties} />
        </main>
      </React.Fragment>
    )
  }
}

export default App;
