import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    // this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      text: '',
      min: '',
      sec: '',
    };
  }
  //Обработка форм
  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const { text, min, sec } = this.state;
      this.props.onAdded(text, min, sec);
      this.setState({ text: '', min: '', sec: '' });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form className="new-todo-form" onKeyDown={this.handleKeyDown}>
        <input
          className="new-todo"
          placeholder="Task"
          name="text"
          value={this.state.text}
          onChange={this.handleChange}
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          name="min"
          value={this.state.min}
          onChange={this.handleChange}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          name="sec"
          value={this.state.sec}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  onAdded: PropTypes.func.isRequired,
};

NewTaskForm.defaultProps = {
  onAdded: () => {},
};
