import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';

import NewTaskForm from '../new-task-form';
import Footer from '../footer';
import TaskList from '../task-list';
import '../task-list/task-list.css';
import '../../index.css';
import '../new-task-form/new-task-form.css';
import '../footer/footer.css';

const App = () => {
  const maxId = useRef(100);
  const filterItems = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Active' },
    { id: 3, name: 'Completed' },
  ];

  const createTodoItem = (label, date = new Date().setHours(0, 30, 0, 0)) => {
    maxId.current += 1;
    return {
      id: maxId.current,
      title: label,
      completed: false,
      created: new Date(),
      date: new Date(date),
      isPaused: true,
      timerId: null,
    };
  };

  const [tasks, setTasks] = useState([
    createTodoItem('Completed task'),
    createTodoItem('Editing task'),
    createTodoItem('Active task'),
  ]);

  const [filter, setFilter] = useState('All');

  useEffect(() => {
    return () => {
      tasks.forEach((task) => {
        if (task.timerId) {
          clearInterval(task.timerId);
        }
      });
    };
  }, []);

  const addTaskItem = (text, min = 30, sec = 0) => {
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

    const additionalHours = Math.floor(minNum / 60);
    const totalMinutes = minNum % 60;
    const totalSeconds = secNum % 60;
    const additionalMinutes = Math.floor(secNum / 60);
    const finalMinutes = (totalMinutes + additionalMinutes) % 60;
    const finalHours = additionalHours + Math.floor((totalMinutes + additionalMinutes) / 60);
    const dateTime = new Date();
    dateTime.setHours(finalHours, finalMinutes, totalSeconds, 0);

    setTasks((tasks) => [...tasks, createTodoItem(text, dateTime)]);
  };

  const deleteTaskItem = useCallback(
    (id) => {
      stopTimer(id);
      setTasks((tasks) => tasks.filter((task) => task.id !== id));
    },
    [tasks]
  );

  const editTaskItem = useCallback(
    (id, newText) => {
      stopTimer(id);
      if (newText.length === 0) {
        window.alert('Вы ничего не задали в этом задании');
        return;
      }
      setTasks((tasks) =>
        tasks.map((task) => (task.id === id ? { ...task, title: newText, created: new Date() } : task))
      );
    },
    [tasks]
  );

  const toggleTaskItem = useCallback(
    (id) => {
      stopTimer(id);
      setTasks((tasks) => tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
    },
    [tasks]
  );

  const updateTime = useCallback(
    (id) => {
      setTasks((tasks) =>
        tasks.map((task) => {
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
        })
      );
    },
    [tasks]
  );

  const startTimer = useCallback(
    (id) => {
      setTasks((tasks) =>
        tasks.map((task) => {
          if (task.id === id && task.isPaused) {
            const timerId = setInterval(() => updateTime(id), 1000);
            return { ...task, isPaused: false, timerId };
          }
          return task;
        })
      );
    },
    [tasks, updateTime]
  );

  const stopTimer = useCallback(
    (id) => {
      setTasks((tasks) =>
        tasks.map((task) => {
          if (task.id === id && !task.isPaused) {
            clearInterval(task.timerId);
            return { ...task, isPaused: true, timerId: null };
          }
          return task;
        })
      );
    },
    [tasks]
  );

  const clearCompleted = () => {
    setTasks((tasks) => tasks.filter((task) => !task.completed));
  };

  const countItemsCompleted = useMemo(() => tasks.reduce((acc, task) => (task.completed ? acc : acc + 1), 0), [tasks]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Active') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true;
  });

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAdded={addTaskItem} />
      </header>
      <section className="main">
        <TaskList
          tasks={filteredTasks}
          onDeleted={deleteTaskItem}
          onEdited={editTaskItem}
          onToggle={toggleTaskItem}
          onUpdateTime={updateTime}
          startTimer={startTimer}
          stopTimer={stopTimer}
        />
        <Footer
          clearCompleted={clearCompleted}
          filterItems={filterItems}
          setFilter={setFilter}
          count={countItemsCompleted}
        />
      </section>
    </section>
  );
};

export default App;
