import React, {Component} from 'react';
import {formatDistanceToNow} from "date-fns"

/* eslint-disable react/prop-types */

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleOn: false,
            editing: false,
            editText: props.task.title,
        };
    }

    onCheckboxClick = () => {
        this.setState(({ toggleOn }) => {
            return {
                toggleOn: !toggleOn,
            }
        })
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
        const { onDeleted, task } = this.props;
        const { toggleOn, editing, editText } = this.state;

        let checked = false;
        let classNames = '';
        if (toggleOn) {
            classNames += 'completed';
            checked = true;
        }


        if (editing && !toggleOn) {
            classNames = 'editing';
            checked = false;
        }
        const createdTask = formatDistanceToNow(new Date(task.created));

        return (
            <li className={classNames}>
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={checked}
                        onChange={this.onCheckboxClick}
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
