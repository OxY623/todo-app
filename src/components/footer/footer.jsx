import PropTypes from 'prop-types';
import React from 'react';

import TasksFilter from '../tasks-filter';

import '../tasks-filter/tasks-filter.css';

const Footer = ({ filterItems = [], setFilter = () => {}, count = 0, clearCompleted = () => {} }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{count} item left</span>
      <TasksFilter filterItems={filterItems} onFilterChange={setFilter} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  clearCompleted: PropTypes.func,
  filterItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  setFilter: PropTypes.func,
  count: PropTypes.number,
};

export default Footer;
