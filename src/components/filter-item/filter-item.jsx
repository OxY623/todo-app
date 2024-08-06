import PropTypes from 'prop-types';
import React from 'react';

import './filter-item.css';
const FilterItem = ({ label = 'All', onFilterChange = () => {}, selected = false }) => {
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
};

FilterItem.propTypes = {
  label: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

export default FilterItem;
