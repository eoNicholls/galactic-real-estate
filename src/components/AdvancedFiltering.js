import React from 'react';
import AttributeRange from './AttributeRange.js';
import AttributeDropdown from './AttributeDropdown.js';


class AdvancedFiltering extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attributes: props.attributes,
      onChange: props.onChange
    }
  }

  filteringFunctions = {}

  onFieldChange = (attribute, func) => {
    this.filteringFunctions[attribute] = func;
    this.state.onChange(this.filteringFunctions);
  }

  render() {
    return(
      <div>
        <AttributeRange
          attribute={'diameter'}
          onChange={this.onFieldChange}
          label={'Diameter between:'}
          step={'1000'}
        />
        <AttributeDropdown
          attribute={'star'}
          onChange={this.onFieldChange}
          label={'Select from:'}
          options={[
            <option value={''}>-</option>,
            <option value={'Procyon'}>Procyon</option>,
            <option value={'Sirius A'}>Sirius A</option>,
            <option value={'61 Cygni'}>61 Cygni</option>
          ]}
        />
      </div>
    );
  }

}


export default AdvancedFiltering;
