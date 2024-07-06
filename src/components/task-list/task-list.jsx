import React, { Component } from 'react';
import Task from '../task';
import '../task/task.css';

/* eslint-disable react/prop-types */

export default class TaskList extends Component {
    render() {
        const { tasks, onDeleted, onEdited } = this.props;

        const tasksList = tasks.map(task => (
            <Task
                key={task.id}
                task={task}
                onDeleted={onDeleted}
                onEdited={onEdited}
            />
        ));

        return (
            <ul className="todo-list">
                {tasksList}
            </ul>
        );
    }
}
