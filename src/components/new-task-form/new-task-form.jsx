import PropTypes from 'prop-types';
import React, { useState } from 'react';

const NewTaskForm = ({ onAdded }) => {
  const [text, setText] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onAdded(text, min, sec);
      setText('');
      setMin('');
      setSec('');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'text') setText(value);
    if (name === 'min') setMin(value);
    if (name === 'sec') setSec(value);
  };

  return (
    <form className="new-todo-form" onKeyDown={handleKeyDown}>
      <input className="new-todo" placeholder="Task" name="text" value={text} onChange={handleChange} autoFocus />
      <input className="new-todo-form__timer" placeholder="Min" name="min" value={min} onChange={handleChange} />
      <input className="new-todo-form__timer" placeholder="Sec" name="sec" value={sec} onChange={handleChange} />
    </form>
  );
};

NewTaskForm.propTypes = {
  onAdded: PropTypes.func.isRequired,
};

NewTaskForm.defaultProps = {
  onAdded: () => {},
};

export default NewTaskForm;
