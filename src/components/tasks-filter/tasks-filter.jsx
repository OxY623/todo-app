import React, {Component} from 'react';
import FilterItem from '../filter-item';
import '../tasks-filter/tasks-filter.css';

/* eslint-disable react/prop-types */

export default class TasksFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFilter: null
        };
    }

    handleFilterChange = (label) => {
        this.setState({ selectedFilter: label });
        this.props.onFilterChange(label);
    };

    render() {
        const { filterItems, onFilterChange } = this.props;
        const { selectedFilter } = this.state;

        const filterElements = filterItems.map(filter => (
            <li key={filter.id}>
                <FilterItem
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
