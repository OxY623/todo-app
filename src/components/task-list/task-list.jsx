import React, { Component } from 'react';
import Task from '../task';
import '../task/task.css';

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
