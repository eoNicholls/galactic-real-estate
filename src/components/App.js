import React from 'react';
import FilterContainer from './FilterContainer.js';
import jsonData from '../assets/planetData.json';


class App extends React.Component {
  constructor() {
    super();
    this.PLANETS = JSON.parse(JSON.stringify(jsonData));
  }

  render() {
    return (
      <React.Fragment>
        <header>
          <h1>Galactic Real Estate Agency</h1>
        </header>
        <main>
          <FilterContainer objects={this.PLANETS}/>
        </main>
      </React.Fragment>
    )
  }
}

export default App;
