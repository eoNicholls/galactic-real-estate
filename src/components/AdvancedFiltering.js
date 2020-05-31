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
          attribute={'size'}
          onChange={this.onFieldChange}
          label={'Size between:'}
          step={'1000'}
        />
        <AttributeDropdown
          attribute={'dropdown'}
          onChange={this.onFieldChange}
          label={'Select from:'}
          options={[
            <option value={''}>-</option>,
            <option value={'one'}>one</option>,
            <option value={'two'}>two</option>,
            <option value={'three'}>three</option>
          ]}
        />
      </div>
    );
  }

}


export default AdvancedFiltering;
