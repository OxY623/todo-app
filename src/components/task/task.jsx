import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: null,
      editText: props.task.title || '',
      checked: false,
    };
  }

  onSwitchEditing = () => {
    this.setState(({ editing }) => {
      return { editing: !editing };
    });
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
    const { task, onToggle } = this.props;
    const { checked } = this.state;
    this.setState({ checked: !checked });
    onToggle(task.id);
  };

  render() {
    const { onDeleted, task } = this.props;
    const { editing, editText, checked } = this.state;
    let classNames = task.completed ? 'completed' : '';
    if (editing && !task.completed) {
      classNames = 'editing';
    }

    const createdTask = formatDistanceToNow(new Date(task.created));

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={this.onToggleItem} checked={checked} />
          <label>
            <span className="description">{task.title}</span>
            <span className="created">created {createdTask} ago</span>
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
};
