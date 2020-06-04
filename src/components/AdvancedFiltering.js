import React from 'react';
import AttributeRange from './AttributeRange.js';
import AttributeDropdown from './AttributeDropdown.js';
import { capitalise } from '../utils/UtilityFunctions.js';


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
    if (func === null) delete this.filteringFunctions[attribute]
    else this.filteringFunctions[attribute] = func;
    this.state.onChange(this.filteringFunctions);
  }

  /*
    add AttributeRange components according to the following pattern:
    [attribute, label, step (optional)]
  */
  rangeFilters = [
    ['diameter', 'Diameter'],
    ['averageTemperature', 'Average temperature'],
    ['orbitalPeriod', 'Orbital period'],
    ['dayLength', 'Day length']
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
      ['rocky', 'gaseous', 'liquid']
    ],
    [
      'atmosphere', 'Atmosphere:',
      ['breathable', 'toxic to humans', 'none']
    ],
    [
      'water', 'Water state:',
      ['liquid', 'frozen', 'none']
    ],
    [
      'life', 'Life:',
      ['cellular', 'multicellular', 'intelligent', 'none']
    ]
  ];

  render() {
    return(
      <div>
        {
          this.rangeFilters.map(att => {
            return <AttributeRange
              key={att[0]}
              attribute={att[0]}
              label={att[1]}
              onChange={this.onFieldChange}
            />
          })
        }
        {
          this.dropdownFilters.map(att => {
            return <AttributeDropdown
              key={att[0]}
              attribute={att[0]}
              label={att[1]}
              onChange={this.onFieldChange}
              options={
                att[2].map(option => {
                  return <option key={option} value={option}>{capitalise(option)}</option>
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
