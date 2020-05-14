import React from 'react';
import FilteredPropertyList from './FilteredPropertyList.js';
import SearchField from './SearchField.js';
import ValueField from './ValueField.js';

import jsonData from '../assets/data.json';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchfield: '',
      valuerange: [-Infinity, Infinity]
    }

    this.PROPERTIES = JSON.parse(JSON.stringify(jsonData));
  }

  onSearchFieldChange = (event) => {
    this.setState({ searchfield: event.target.value });
  }

  onValueFieldChange = (event) => {
    const target = event.target;
    const currentVR = this.state.valuerange;
    this.setState(target.name === 'min'
                    ? {valuerange: [target.value, currentVR[1]]}
                    : {valuerange: [currentVR[0], target.value]});
  }

  render() {
    return (
      <React.Fragment>
        <header>
          <h1>Galactic Real Estate Agency</h1>
          <form>
            <SearchField props={this.onSearchFieldChange}/>
            <ValueField props={this.onValueFieldChange}/>
          </form>
        </header>
        <main>
          <FilteredPropertyList properties={this.PROPERTIES}
                                searchfield={this.state.searchfield}
                                valuerange={this.state.valuerange} />
        </main>
      </React.Fragment>
    )
  }
}

export default App;
