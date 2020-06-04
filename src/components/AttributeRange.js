import React from 'react';
import RangeField from './RangeField.js';


class AttributeRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attribute: props.attribute,
      onChange: props.onChange,
      label: props.label,
      step: props.step,
      range: [-Infinity, Infinity]
    }
  }

  createFunction = () => {
    const min = this.state.range[0];
    const max = this.state.range[1];
    return (a => a > min && a < max);
  }

  onRangeFieldChange = (event) => {
    const target = event.target;
    const modifier = (target.name === 'min')
      ? -1
      : 1
    const value = (target.value === '')
      ? modifier * Infinity
      : parseInt(target.value);
      
    const currentRange = this.state.range;
    this.setState({ range: (target.name === 'min')
      ? [value, currentRange[1]]
      : [currentRange[0], value]
    });
  }

  render() {
    const check = this.state.range.reduce((acc, item) => {
      return Number.isFinite(item) || acc;
    }, false);

    if (check) this.state.onChange(this.state.attribute, this.createFunction());

    return (
      <RangeField
        onChange={this.onRangeFieldChange}
        label={this.state.label}
        step={this.state.step || '1'}
      />
    )
  }

}


export default AttributeRange;
