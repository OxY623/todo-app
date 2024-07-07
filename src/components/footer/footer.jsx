import React, {Component} from 'react';
import TasksFilter from "../tasks-filter";
import '../tasks-filter/tasks-filter.css';

/* eslint-disable react/prop-types */

export default class Footer extends Component {
    render() {
        const { filterItems, setFilter } = this.props;
        return (
            <footer className="footer">
                <span className="todo-count">1 item left</span>
                <TasksFilter filterItems={filterItems} onFilterChange={setFilter} />
                <button className="clear-completed">Clear completed</button>
            </footer>
        );
    }
}
