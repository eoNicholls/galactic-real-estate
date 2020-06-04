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
    [
      'star', 'Star:',
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
    ],
    [
      'composition', 'Composition:',
      ['Rocky', 'Gaseous', 'Liquid']
    ],
    [
      'atmosphere', 'Atmosphere:',
      ['Breathable', 'Toxic to humans', 'None']
    ],
    [
      'water', 'Water state:',
      ['Liquid', 'Frozen', 'None']
    ],
    [
      'life', 'Life:',
      ['Cellular', 'Multicellular', 'Intelligent', 'None']
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
      </div>
    );
  }

}


export default AdvancedFiltering;
