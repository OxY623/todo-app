import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './task.css';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      editText: props.task.title || '',
    };
  }

  onSwitchEditing = () => {
    this.setState(({ editing }) => ({ editing: !editing }));
  };

  handleEditChange = (event) => {
    this.setState({ editText: event.target.value });
  };

  handleEditSubmit = (event) => {
    if (event.key === 'Enter') {
      this.props.onEdited(this.props.task.id, this.state.editText);
      this.onSwitchEditing();
    }
  };

  onToggleItem = () => {
    this.props.onToggle(this.props.task.id);
  };

  formatTime(date) {
    const d = new Date(date);
    const minutes = d.getUTCMinutes().toString().padStart(2, '0');
    const seconds = d.getUTCSeconds().toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  render() {
    const { onDeleted, task, isPaused, activeTaskId, startTimer, stopTimer } = this.props;
    const { editing, editText } = this.state;
    let classNames = task.completed ? 'completed' : '';
    if (editing && !task.completed) {
      classNames = 'editing';
    }

    const createdTask = formatDistanceToNow(new Date(task.created));

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={this.onToggleItem} checked={task.completed} />
          <label>
            <span className="title">{task.title}</span>
            <span className="description">
              {!task.completed ? (
                <button
                  className={`icon ${!isPaused && activeTaskId === task.id ? 'icon-pause' : 'icon-play'}`}
                  onClick={() => (!isPaused && activeTaskId === task.id ? stopTimer() : startTimer(task.id))}
                ></button>
              ) : null}
              {!task.completed ? this.formatTime(task.date) : null}
            </span>
            <span className="description">created {createdTask} ago</span>
          </label>
          <button className="icon icon-destroy" onClick={() => onDeleted(task.id)}></button>
          <button className="icon icon-edit" onClick={this.onSwitchEditing}></button>
        </div>
        {editing && (
          <input
            type="text"
            className="edit"
            value={editText}
            onChange={this.handleEditChange}
            onKeyDown={this.handleEditSubmit}
          />
        )}
      </li>
    );
  }
}

Task.defaultProps = {
  task: {
    id: 0,
    title: '',
    completed: false,
    created: new Date(),
  },
  onDeleted: () => {},
  onToggle: () => {},
  onEdited: () => {},
  onUpdateTime: () => {},
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    created: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onEdited: PropTypes.func.isRequired,
  onUpdateTime: PropTypes.func.isRequired,
  isPaused: PropTypes.bool.isRequired,
  activeTaskId: PropTypes.number,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
};
