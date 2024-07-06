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
        this.state = {
            tasks: [
                {id: 1, title: 'Completed task', completed: true, created: new Date()},
                {id: 2, title: 'Editing task', completed: false, created: new Date()},
                {id: 3, title: 'Active task', completed: false, created: new Date()},
            ]
        }
    }

    addTaskItem = (text) => {
        try{
            this.setState((state) => {
                const id = state.tasks.length + 1;
                const newTask = {id, title: text, completed: false, created: new Date()};
                return ({tasks: [...state.tasks, newTask]});
            });
        } finally{
            console.log(this.state.tasks);
        }

    }

    deleteTaskItem = (id) => {
        this.setState((state) => {
            const updatedTasks = state.tasks.filter(task => task.id !== id);
            return {tasks: updatedTasks};
        });
    }

    editTaskItem = (id, newText) => {
        this.setState((state) => {
            const updatedTasks = state.tasks.map(task => {
                 return (task.id === id) ? {
                    ...task,
                    title: newText,
                    created: new Date(),
                } : task;

            });

            return {tasks: updatedTasks};
        });
    }

    render() {
        const {tasks} = this.state;

        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm onAdded={this.addTaskItem}/>
                </header>
                <section className="main">
                    <TaskList
                        onDeleted={this.deleteTaskItem}
                        onEdited={this.editTaskItem}
                        tasks={tasks}
                    />
                    <Footer/>
                </section>
            </section>
        );
    }
}