import React, {Component} from 'react';
import {formatDistanceToNow} from "date-fns"
import PropTypes from 'prop-types';

/* eslint-disable react/prop-types */

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            editText: props.task.title,
        };
    }

    onSwitchEditing = () => {
        this.setState(({ editing }) => {
            return { editing: !editing }
        })
    }

    handleEditChange = (event) => {
        this.setState({ editText: event.target.value });
    }

    handleEditSubmit = (event) => {
        if (event.key === 'Enter') {
            this.props.onEdited(this.props.task.id, this.state.editText);
            this.onSwitchEditing();
        }
    }

    render() {
        const { onDeleted, task, onToggle } = this.props;
        const { editing, editText } = this.state;
        const onToggleItem = onToggle.bind(this, task.id);

        let classNames = task.completed ? 'completed' : '';
        if (editing && !task.completed) {
            classNames = 'editing';
        }

        // console.log(editing);
        // console.log(classNames);
        const createdTask = formatDistanceToNow(new Date(task.created));

        return (
            <li className={classNames}>
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        onChange={onToggleItem}
                    />
                    <label>
                        <span className="description">{task.title}</span>
                        <span className="created">created {createdTask} ago</span>
                    </label>
                    <button className="icon icon-destroy" onClick={() => onDeleted(task.id)}></button>
                    <button className="icon icon-edit" onClick={this.onSwitchEditing}></button>
                </div>
                {editing &&
                    <input
                        type="text"
                        className="edit"
                        value={editText}
                        onChange={this.handleEditChange}
                        onKeyDown={this.handleEditSubmit}
                    />
                }
            </li>
        );
    }
}
Task.defaultProps = {
    task: {},
    onDeleted: () => {},
    onToggle: () => {},
    onEdited: () => {},
};
Task.propTypes = {
    task: PropTypes.object.isRequired,
    onDeleted: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    onEdited: PropTypes.func.isRequired,
};
