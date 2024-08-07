import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import './task.css';

const Task = ({
  task = {
    id: 101,
    title: 'Testing task',
    completed: false,
    created: '2024-08-07T10:20:05.039Z',
    date: '2024-08-06T21:30:00.000Z',
    isPaused: true,
    timerId: null,
  },
  onDeleted = () => {},
  onToggle = () => {},
  onEdited = () => {},
  startTimer = () => {},
  stopTimer = () => {},
}) => {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(task.title || '');
  const inputRef = useRef();
  console.log(task);

  const onSwitchEditing = () => {
    setEditing(!editing);
  };

  const handleEditChange = () => {
    setEditText(inputRef.current.value);
  };

  const handleEditSubmit = (event) => {
    if (event.key === 'Enter') {
      onEdited(task.id, editText);
      onSwitchEditing();
    }
  };

  const onToggleItem = () => {
    onToggle(task.id);
  };

  const formatTime = (date) => {
    const d = new Date(date);
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const seconds = d.getSeconds().toString().padStart(2, '0');

    if (hours === '00') {
      return `${minutes}:${seconds}`;
    }

    return `${hours}:${minutes}:${seconds}`;
  };

  let classNames = task.completed ? 'completed' : '';
  if (editing && !task.completed) {
    classNames = 'editing';
  }

  const createdTask = formatDistanceToNow(new Date(task.created));

  return (
    <li className={classNames}>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={onToggleItem} checked={task.completed} />
        <label>
          <span className="title">{task.title}</span>
          <span className="description">
            {!task.completed ? (
              <button
                className={`icon ${task.isPaused ? 'icon-play' : 'icon-pause'}`}
                onClick={task.isPaused ? () => startTimer(task.id) : () => stopTimer(task.id)}
              ></button>
            ) : null}
            {!task.completed ? formatTime(task.date) : null}
          </span>
          <span className="description">created {createdTask} ago</span>
        </label>
        <button className="icon icon-destroy" onClick={() => onDeleted(task.id)}></button>
        <button className="icon icon-edit" onClick={onSwitchEditing}></button>
      </div>
      {editing && (
        <input
          ref={inputRef}
          type="text"
          className="edit"
          value={editText}
          onChange={handleEditChange}
          onKeyDown={handleEditSubmit}
        />
      )}
    </li>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    created: PropTypes.object,
    date: PropTypes.object,
    isPaused: PropTypes.bool,
    timerId: PropTypes.number,
  }).isRequired,
  onDeleted: PropTypes.func,
  onToggle: PropTypes.func,
  onEdited: PropTypes.func,
  onUpdateTime: PropTypes.func,
  startTimer: PropTypes.func,
  stopTimer: PropTypes.func,
};

export default Task;
