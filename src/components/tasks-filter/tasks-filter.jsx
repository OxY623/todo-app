import React, {Component} from 'react';
import FilterItem from '../filter-item';
import '../tasks-filter/tasks-filter.css';

/* eslint-disable react/prop-types */

export default class TasksFilter extends Component {
    render() {
        const { filterItems, onFilterChange } = this.props;

        const filterElements = filterItems.map(filter => (
            <li key={filter.id}>
                <FilterItem
                    label={filter.name}
                    onFilterChange={onFilterChange}
                />
            </li>
        ));

        return (
            <ul className="filters">
                {filterElements}
            </ul>
        );
    }
}
