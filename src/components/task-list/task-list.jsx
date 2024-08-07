import PropTypes from 'prop-types';
import React from 'react';

import Task from '../task';
import '../task/task.css';

const TaskList = (props) => {
  const { tasks, onDeleted, onEdited, onToggle, onUpdateTime, isPaused, activeTaskId, startTimer, stopTimer } = props;

  const tasksList = tasks.map((task) => (
    <Task
      key={task.id}
      task={task}
      onDeleted={onDeleted}
      onEdited={onEdited}
      onToggle={onToggle}
      onUpdateTime={onUpdateTime}
      isPaused={isPaused}
      activeTaskId={activeTaskId}
      startTimer={startTimer}
      stopTimer={stopTimer}
    />
  ));

  return <ul className="todo-list">{tasksList}</ul>;
};

TaskList.defaultProps = {
  tasks: [],
  onDeleted: () => {},
  onEdited: () => {},
  onToggle: () => {},
  onUpdateTime: () => {},
  isPaused: true,
  activeTaskId: null,
  startTimer: () => {},
  stopTimer: () => {},
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
  onUpdateTime: PropTypes.func,
  isPaused: PropTypes.bool,
  activeTaskId: PropTypes.number,
  startTimer: PropTypes.func,
  stopTimer: PropTypes.func,
};

export default TaskList;
