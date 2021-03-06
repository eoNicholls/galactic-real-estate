import React from 'react';
import DropdownSelector from './DropdownSelector.js';

class AttributeDropdown extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      attribute: props.attribute,
      onChange: props.onChange,
      label: props.label,
      options: [<option key='' value=''>-</option>].concat(props.options),
      selected: ''
    }
  }

  createFunction = () => {
    const val = this.state.selected;
    return (val === '')
      ? null
      : a => a === val
  }

  onDropdownSelectorChange = (event) => {
    this.setState({ selected: event.target.value });
  }

  render () {
    this.state.onChange(this.state.attribute, this.createFunction());

    return (
      <DropdownSelector
        onChange={this.onDropdownSelectorChange}
        label={this.state.label}
        options={this.state.options}
      />
    )
  }
}

export default AttributeDropdown;
