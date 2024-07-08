import PropTypes from 'prop-types';
import React, { Component } from 'react';

import FilterItem from '../filter-item';

import '../tasks-filter/tasks-filter.css';

export default class TasksFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilter: null,
    };
  }

  handleFilterChange = (label) => {
    this.setState({ selectedFilter: label });
    this.props.onFilterChange(label);
  };

  render() {
    const { filterItems } = this.props;
    const { selectedFilter } = this.state;

    const filterElements = filterItems.map((filter) => (
      <li key={filter.id}>
        <FilterItem
          key={filter.id}
          label={filter.name}
          onFilterChange={this.handleFilterChange}
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
  }
}

TasksFilter.defaultProps = {
  filterItems: [],
  initialFilter: null,
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
