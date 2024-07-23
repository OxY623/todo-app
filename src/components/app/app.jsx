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

  componentDidUpdate(prevProps, prevState) {
    // Очистка таймеров для удалённых задач
    prevState.tasks.forEach((task, index) => {
      if (task.timerId && !this.state.tasks[index].timerId) {
        clearInterval(task.timerId);
      }
    });
  }

  componentWillUnmount() {
    // Очистка таймеров для всех задач при размонтировании
    this.state.tasks.forEach((task) => {
      if (task.timerId) {
        clearInterval(task.timerId);
      }
    });
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
    isPaused: true,
    timerId: null,
  });

  addTaskItem = (text, min = 30, sec = 0) => {
    console.log(min, ':', sec);

    // Проверка на пустое задание
    if (text.length === 0) {
      window.alert('Вы ничего не задали в этом задании. Попробуйте снова.');
      return;
    }

    // Преобразование минут и секунд в числа
    const minNum = Number(min);
    const secNum = Number(sec);

    // Проверка на корректность значений
    if (isNaN(minNum) || isNaN(secNum)) {
      window.alert('Введите корректные значения для минут и секунд.');
      return;
    }

    // Перерасчет минут и секунд
    const additionalHours = Math.floor(minNum / 60);
    const totalMinutes = minNum % 60;
    const totalSeconds = secNum % 60;
    const additionalMinutes = Math.floor(secNum / 60);

    const finalMinutes = (totalMinutes + additionalMinutes) % 60;
    const finalHours = additionalHours + Math.floor((totalMinutes + additionalMinutes) / 60);

    const dateTime = new Date();
    dateTime.setHours(finalHours, finalMinutes, totalSeconds, 0);
    console.log(dateTime);
    // Обновление состояния с новым заданием
    this.setState((state) => ({
      tasks: [...state.tasks, this.createTodoItem(text, dateTime)],
    }));
  };

  deleteTaskItem = (id) => {
    this.setState((state) => {
      const task = state.tasks.find((task) => task.id === id);
      if (task && task.timerId) {
        clearInterval(task.timerId);
      }
      return {
        tasks: state.tasks.filter((task) => task.id !== id),
      };
    });
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

  updateTime = (id) => {
    this.setState((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id === id) {
          const newDate = new Date(task.date);
          newDate.setSeconds(newDate.getSeconds() - 1);

          if (newDate.getMinutes() === 0 && newDate.getSeconds() === 0) {
            clearInterval(task.timerId);
            return { ...task, date: newDate, completed: true, isPaused: true, timerId: null };
          }

          return { ...task, date: newDate };
        }
        return task;
      }),
    }));
  };

  startTimer = (id) => {
    this.setState((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id === id) {
          if (task.isPaused) {
            const timerId = setInterval(() => this.updateTime(id), 1000);
            return { ...task, isPaused: false, timerId };
          }
        }
        return task;
      }),
    }));
  };

  stopTimer = (id) => {
    this.setState((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id === id) {
          if (!task.isPaused) {
            clearInterval(task.timerId);
            return { ...task, isPaused: true, timerId: null };
          }
        }
        return task;
      }),
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

  render() {
    const { tasks, filter } = this.state;

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
            tasks={filteredTasks}
            onDeleted={this.deleteTaskItem}
            onEdited={this.editTaskItem}
            onToggle={this.toggleTaskItem}
            onUpdateTime={this.updateTime}
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
