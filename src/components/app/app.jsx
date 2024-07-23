import React, { Component } from 'react';

import NewTaskForm from '../new-task-form';
import Footer from '../footer';
import TaskList from '../task-list';
import '../task-list/task-list.css';
import '../../index.css';
import '../new-task-form/new-task-form.css';
import '../footer/footer.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.maxId = 100;
    this.filterItems = [
      this.createFilterItems(1, 'All'),
      this.createFilterItems(2, 'Active'),
      this.createFilterItems(3, 'Completed'),
    ];
    this.state = {
      tasks: [
        this.createTodoItem('Completed task', true),
        this.createTodoItem('Editing task'),
        this.createTodoItem('Active task'),
      ],
      filter: 'All',
      isPaused: true,
      activeTaskId: null,
    };
  }

  componentDidMount() {
    this.timerId = setInterval(this.updateTime, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  updateTime = () => {
    const { isPaused, activeTaskId } = this.state;
    if (!isPaused && activeTaskId) {
      this.onUpdateTime(activeTaskId);
    }
  };

  createFilterItems = (id, text) => ({
    id,
    name: text,
  });

  createTodoItem = (label, completed = false) => ({
    id: ++this.maxId,
    title: label,
    completed,
    created: new Date(),
    date: new Date(new Date().setHours(0, 30, 0, 0)),
  });

  addTaskItem = (text, min = 30, sec = 0) => {
    if (text.length === 0) {
      window.alert('Вы ничего не задали в этом задании. Попробуйте снова.');
      return;
    }
    const minNum = Number(min);
    const secNum = Number(sec);
    if (isNaN(minNum) || isNaN(secNum)) {
      window.alert('Введите корректные значения для минут и секунд.');
      return;
    }
    const dateTime = new Date();
    dateTime.setHours(0, minNum, secNum, 0);
    this.setState((state) => ({
      tasks: [...state.tasks, this.createTodoItem(text)],
    }));
  };

  deleteTaskItem = (id) => {
    this.setState((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  };

  editTaskItem = (id, newText) => {
    if (newText.length === 0) {
      window.alert('Вы ничего не задали в этом задании');
      return;
    }
    this.setState((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...task, title: newText, created: new Date() } : task)),
    }));
  };

  toggleTaskItem = (id) => {
    this.setState((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    }));
  };

  onUpdateTime = (id) => {
    this.setState((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id === id) {
          const newDate = new Date(task.date);
          newDate.setSeconds(newDate.getSeconds() - 1);

          if (newDate.getMinutes() === 0 && newDate.getSeconds() === 0) {
            return { ...task, date: newDate, completed: true };
          }

          return { ...task, date: newDate };
        }
        return task;
      }),
    }));
  };

  onCompleteTask = (id) => {
    this.setState((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...task, completed: true } : task)),
    }));
  };

  setFilter = (filter) => {
    this.setState({ filter });
  };

  clearCompleted = () => {
    this.setState((state) => ({
      tasks: state.tasks.filter((task) => !task.completed),
    }));
  };

  startTimer = (id) => {
    this.setState({ isPaused: false, activeTaskId: id });
  };

  stopTimer = () => {
    this.setState({ isPaused: true, activeTaskId: null });
  };

  render() {
    const { tasks, filter, isPaused, activeTaskId } = this.state;
    const countItemsCompleted = tasks.reduce((acc, task) => (task.completed ? acc : acc + 1), 0);
    const filteredTasks = tasks.filter((task) => {
      if (filter === 'Active') return !task.completed;
      if (filter === 'Completed') return task.completed;
      return true;
    });

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAdded={this.addTaskItem} />
        </header>
        <section className="main">
          <TaskList
            onDeleted={this.deleteTaskItem}
            onEdited={this.editTaskItem}
            onToggle={this.toggleTaskItem}
            onUpdateTime={this.onUpdateTime}
            onComplete={this.onCompleteTask}
            tasks={filteredTasks}
            isPaused={isPaused}
            activeTaskId={activeTaskId}
            startTimer={this.startTimer}
            stopTimer={this.stopTimer}
          />
          <Footer
            clearCompleted={this.clearCompleted}
            filterItems={this.filterItems}
            setFilter={this.setFilter}
            count={countItemsCompleted}
          />
        </section>
      </section>
    );
  }
}
