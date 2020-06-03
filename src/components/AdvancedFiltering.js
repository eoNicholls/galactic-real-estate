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

  /*
    add AttributeRange components according to the following pattern:
    [attribute, label, step (optional)]
  */
  rangeFilters = [
    ['diameter', 'Diameter between:']
  ];

  /*
    add AttributeDropdown components according to the following pattern:
    [attribute, label, array of options:
      [
        value/innherHTML
      ]
    ]
  */
  dropdownFilters = [
    ['star', 'Star:',
      [
        '61 Cygni',
        'Alpha Centauri',
        'Epsilon Eridani',
        'EZ Aquarii',
        'Gliese',
        'Groombridge',
        'Kruger',
        'Lacaille 9352',
        'Lalande',
        'Luyten',
        'Procyon',
        'Ross 128',
        'Ross 154',
        'Sirius A',
        'Sirius B',
        'Struve 2398 A',
        'Tau Ceti'
      ]
    ]
  ];

  render() {
    return(
      <div>
        {
          this.rangeFilters.map(att => {
            return <AttributeRange
              attribute={att[0]}
              label={att[1]}
              onChange={this.onFieldChange}
            />
          })
        }
        {
          this.dropdownFilters.map(att => {
            return <AttributeDropdown
              attribute={att[0]}
              label={att[1]}
              onChange={this.onFieldChange}
              options={
                att[2].map(option => {
                  return <option value={option}>{option}</option>
                })
              }
            />
          })
        }
        {/*<AttributeRange
          attribute={'diameter'}
          onChange={this.onFieldChange}
          label={'Diameter between:'}
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
        />*/}
      </div>
    );
  }

}


export default AdvancedFiltering;
