import React, {Component} from 'react';
import TasksFilter from "../tasks-filter";
import '../tasks-filter/tasks-filter.css';

export default class Footer extends Component {
    render() {
        return (<footer className="footer">
            <span className="todo-count">1 item left</span>
            <TasksFilter />
            <button className="clear-completed">Clear completed</button>
        </footer>)
    }
}
