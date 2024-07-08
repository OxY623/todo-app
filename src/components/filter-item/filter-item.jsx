import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './filter-item.css';

export default class FilterItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { label, onFilterChange, selected } = this.props;

    let classNames = selected ? 'selected' : '';

    return (
      <button
        className={classNames}
        onClick={() => {
          onFilterChange(label);
        }}
      >
        {label}
      </button>
    );
  }
}
// const FilterItem = ({label, onFilterChange, selected}) => {
//
//     // const [selected, setSelected] = useState(false);
//     // let classNames = '';
//     //
//     // if (selected) {
//     //     classNames ='selected';
//     // }
//
//     let classNames = selected ? 'selected' : '';
//
//     return (
//             <button className={classNames} onClick={() => {
//                 // setSelected(!selected);
//                 onFilterChange(label);
//             }}>
//                 {label}
//             </button>
//
//     );
// }

FilterItem.defaultProps = {
  label: 'All',
  onFilterChange: () => {},
  selected: false,
};

FilterItem.propTypes = {
  label: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

// export default FilterItem;
