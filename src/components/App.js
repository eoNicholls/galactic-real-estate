import React from 'react';
import FilteredPropertyList from './FilteredPropertyList.js';
import jsonData from '../assets/planetData.json';


class App extends React.Component {
  constructor() {
    super();
    this.PROPERTIES = JSON.parse(JSON.stringify(jsonData));
  }

  render() {
    return (
      <React.Fragment>
        <header>
          <h1>Galactic Real Estate Agency</h1>
        </header>
        <main>
          <FilteredPropertyList properties={this.PROPERTIES}/>
        </main>
      </React.Fragment>
    )
  }
}

export default App;
