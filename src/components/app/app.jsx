import React, {Component} from 'react';
import '../../index.css';
import NewTaskForm from "../new-task-form";
import '../new-task-form/new-task-form.css';
import Footer from '../footer';
import '../footer/footer.css';
import TaskList from "../task-list";
import '../task-list/task-list.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.maxId = 100;
        this.filterItems = [
            { id: 1, name: "All" },
            { id: 2, name: "Active" },
            { id: 3, name: "Completed" }
        ];
        this.state = {
            tasks: [
                this.createTodoItem('Completed task'),
                this.createTodoItem('Editing task'),
                this.createTodoItem('Active task')
            ],
            filter: 'All'
        };
    }

    createTodoItem = (label) => {
        return {
            id: ++this.maxId,
            title: label,
            completed: false,
            created: new Date()
        };
    }

    addTaskItem = (text) => {
        this.setState((state) => {
            const newTask = this.createTodoItem(text);
            return { tasks: [...state.tasks, newTask] };
        });
    }

    deleteTaskItem = (id) => {
        this.setState((state) => {
            const updatedTasks = state.tasks.filter(task => task.id !== id);
            return { tasks: updatedTasks };
        });
    }

    editTaskItem = (id, newText) => {
        this.setState((state) => {
            const updatedTasks = state.tasks.map(task => {
                return (task.id === id) ? { ...task, title: newText, created: new Date() } : task;
            });
            return { tasks: updatedTasks };
        });
    }

    toggleTaskItem = (id) => {
        this.setState((state) => {
            const updatedTasks = state.tasks.map(task => {
                return (task.id === id) ? { ...task, completed: !task.completed } : task;
            });
            return { tasks: updatedTasks };
        });
    }

    setFilter = (filter) => {
        this.setState({ filter });
    }

    clearCompleted = () => {
        this.setState((state) => {
            const updatedTasks = state.tasks.filter(task =>!task.completed);
            return { tasks: updatedTasks };
        });
    }

    render() {
        const { tasks, filter } = this.state;
        let countItemsCompleted = tasks.reduce((acc, task) =>{
            return !task.completed? acc : acc + 1;
        }, 0);

        const filteredTasks = tasks.filter(task => {
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
                        tasks={filteredTasks}
                    />
                    <Footer
                        clearCompleted = {this.clearCompleted}
                        filterItems={this.filterItems}
                        setFilter={this.setFilter}
                        count = {countItemsCompleted}

                    />
                </section>
            </section>
        );
    }
}
