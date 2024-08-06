import PropTypes from 'prop-types';
import React, { useState } from 'react';

import FilterItem from '../filter-item';

import '../tasks-filter/tasks-filter.css';

const TasksFilter = ({
  filterItems = [{ 1: 'All' }, { 2: 'Active' }, { 3: 'Completed' }],
  onFilterChange = () => {
    console.log('Filter change test function'); // eslint-disable-line no-console
  },
}) => {
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleFilterChange = (label) => {
    setSelectedFilter(label);
    onFilterChange(label);
  };

  const filterElements = filterItems.map((filter) => (
    <li key={filter.id}>
      <FilterItem
        key={filter.id}
        label={filter.name}
        onFilterChange={handleFilterChange}
        selected={selectedFilter === filter.name}
      />
    </li>
  ));

  return (
    <ul className="filters">
      {filterElements}
      {}
    </ul>
  );
};

TasksFilter.propTypes = {
  filterItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  initialFilter: PropTypes.string,
};

export default TasksFilter;
