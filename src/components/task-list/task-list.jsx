import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Task from '../task';
import '../task/task.css';

export default class TaskList extends Component {
  render() {
    const { tasks, onDeleted, onEdited, onToggle, onUpdateTime } = this.props;

    const tasksList = tasks.map((task) => (
      <Task
        key={task.id}
        task={task}
        onDeleted={onDeleted}
        onEdited={onEdited}
        onToggle={onToggle}
        onUpdateTime={onUpdateTime}
      />
    ));

    return <ul className="todo-list">{tasksList}</ul>;
  }
}

TaskList.defaultProps = {
  tasks: [],
  onDeleted: () => {},
  onEdited: () => {},
  onToggle: () => {},
  onUpdateTime: () => {},
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ),
  onDeleted: PropTypes.func,
  onEdited: PropTypes.func,
  onToggle: PropTypes.func,
  onUpdateTime: PropTypes.func.isRequired,
};
