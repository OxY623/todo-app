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
        this.createTodoItem('Completed task'),
        this.createTodoItem('Editing task'),
        this.createTodoItem('Active task'),
      ],
      filter: 'All',
    };
  }

  createFilterItems = (id, text) => ({
    id,
    name: text,
  });

  createTodoItem = (label, date = new Date().setHours(0, 30, 0, 0)) => ({
    id: ++this.maxId,
    title: label,
    completed: false,
    created: new Date(),
    date: new Date(date),
  });
  // Добавление новой задачи
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
    // console.log(dateTime);
    this.setState((state) => ({
      tasks: [...state.tasks, this.createTodoItem(text, dateTime)],
    }));
  };
  // Удаление задачи по идентификатору
  deleteTaskItem = (id) => {
    this.setState((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  };
  // Редактирование задачи
  editTaskItem = (id, newText) => {
    if (newText.length === 0) {
      window.alert('Вы ничего не задали в этом задании');
      return;
    }
    this.setState((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...task, title: newText, created: new Date() } : task)),
    }));
  };
  // Переключение состояния задачи (выполнена/не выполнена)
  toggleTaskItem = (id) => {
    this.setState((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    }));
  };
  // Обновление времени до окончания задачи
  onUpdateTime = (id) => {
    this.setState((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id === id) {
          const newDate = new Date(task.date);
          newDate.setSeconds(newDate.getSeconds() - 1);

          // Если время достигло 00:00, помечаем задачу как завершенную
          if (newDate.getMinutes() === 0 && newDate.getSeconds() === 0) {
            return { ...task, date: newDate, completed: true };
          }

          return { ...task, date: newDate };
        }
        return task;
      }),
    }));
  };
  // Завершение выполненной задачи
  onCompleteTask = (id) => {
    this.setState((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...task, completed: true } : task)),
    }));
  };
  // Смена фильтра
  setFilter = (filter) => {
    this.setState({ filter });
  };
  // Очистка выполненных задач
  clearCompleted = () => {
    this.setState((state) => ({
      tasks: state.tasks.filter((task) => !task.completed),
    }));
  };

  render() {
    const { tasks, filter } = this.state;
    //Подсчет незавершенных задач
    const countItemsCompleted = tasks.reduce((acc, task) => (task.completed ? acc : acc + 1), 0);
    //Фильтрация задач по фильтру
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
