import React from 'react';
import FilteredPropertyList from './FilteredPropertyList.js';
import SearchField from './SearchField.js';

import jsonData from '../assets/data.json';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchfield: ''
    }

    this.PROPERTIES = JSON.parse(JSON.stringify(jsonData));
  }

  onSearchFieldChange = (event) => {
    this.setState({ searchfield: event.target.value });
  }

  render() {
    return (
      <React.Fragment>
        <header>
          <h1>Galactic Real Estate Agency</h1>
          <SearchField props={this.onSearchFieldChange}/>
        </header>
        <main>
          <FilteredPropertyList properties={this.PROPERTIES} searchfield={this.state.searchfield} />
        </main>
      </React.Fragment>
    )
  }
}

export default App;
