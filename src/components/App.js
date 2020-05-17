import React from 'react';
import FilteredPropertyList from './FilteredPropertyList.js';
import SearchField from './SearchField.js';
import PriceRangeField from './PriceRangeField.js';
import ErrorMessageContainer from './ErrorMessageContainer.js';

import jsonData from '../assets/planetData.json';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchfield: '',
      pricerange: [-Infinity, Infinity]
    }

    this.PROPERTIES = JSON.parse(JSON.stringify(jsonData));
  }

  onSearchFieldChange = (event) => {
    this.setState({ searchfield: event.target.value });
  }

  onPriceFieldChange = (event) => {
    const target = event.target;
    const value = parseInt(target.value);
    const currentVR = this.state.pricerange;
    this.setState(target.name === 'min'
                    ? {pricerange: [value, currentVR[1]]}
                    : {pricerange: [currentVR[0], value]});
  }

  render() {
    return (
      <React.Fragment>
        <header>
          <h1>Galactic Real Estate Agency</h1>
          <form>
            <SearchField props={this.onSearchFieldChange}/>
            <PriceRangeField props={this.onPriceFieldChange}/>
          </form>
        </header>

        <div>
          <ErrorMessageContainer props={this.state}/>
        </div>

        <main>
          <FilteredPropertyList properties={this.PROPERTIES}
                                searchfield={this.state.searchfield}
                                pricerange={this.state.pricerange} />
        </main>
      </React.Fragment>
    )
  }
}

export default App;
