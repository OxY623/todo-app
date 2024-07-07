import React, { Component } from 'react';
import Task from '../task';
import '../task/task.css';
import PropTypes from 'prop-types';

/* eslint-disable react/prop-types */

export default class TaskList extends Component {
    render() {
        const { tasks, onDeleted, onEdited,  onToggle } = this.props;

        const tasksList = tasks.map(task => (
            <Task
                key={task.id}
                task={task}
                onDeleted={onDeleted}
                onEdited={onEdited}
                onToggle={onToggle}
            />
        ));

        return (
            <ul className="todo-list">
                {tasksList}
            </ul>
        );
    }
}

TaskList.defaultProps = {
    tasks: [],
    onDeleted: () => {},
    onEdited: () => {},
    onToggle: () => {},
    filterItems: [],
    setFilter: () => {},
    filter: '',
    onFilterChange: () => {},
    isCompleted: false,
    isEditing: false,
    onSwitchEditing: () => {},

}

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    })),
    onDeleted: PropTypes.func,
    onEdited: PropTypes.func,
    onToggle: PropTypes.func,
    filterItems: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    })),
    setFilter: PropTypes.func,
    filter: PropTypes.string,
    onFilterChange: PropTypes.func,
    isCompleted: PropTypes.bool,
    isEditing: PropTypes.bool,
    onSwitchEditing: PropTypes.func,
}
