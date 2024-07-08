import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.props.onAdded(event.target.value);
      event.target.value = '';
    }
  };

  render() {
    return <input className="new-todo" onKeyDown={this.handleKeyDown} placeholder="What needs to be done?" autoFocus />;
  }
}

NewTaskForm.propTypes = {
  onAdded: PropTypes.func.isRequired,
};

NewTaskForm.defaultProps = {
  onAdded: () => {},
};
