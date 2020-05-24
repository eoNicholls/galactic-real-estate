import React from 'react';
import FilterContainer from './FilterContainer.js';
import jsonData from '../assets/planetData.json';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar as solidStar} from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
library.add(solidStar, regularStar);


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
