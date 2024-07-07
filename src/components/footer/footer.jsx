import React, {Component} from 'react';
import TasksFilter from "../tasks-filter";
import '../tasks-filter/tasks-filter.css';

/* eslint-disable react/prop-types */

export default class Footer extends Component {
    render() {
        const { filterItems, setFilter, count } = this.props;
        return (
            <footer className="footer">
                <span className="todo-count">{count} item left</span>
                <TasksFilter filterItems={filterItems} onFilterChange={setFilter} />
                <button
                    className="clear-completed"
                    onClick={this.props.clearCompleted}  // Clear completed tasks
                >Clear completed</button>
            </footer>
        );
    }
}
