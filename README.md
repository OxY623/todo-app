# TODO App

This is a simple TODO application built with React.
It allows users to add tasks, filter tasks based on their status (All, Active, Completed), and clear completed tasks.
The application also displays the count of uncompleted tasks.

## Features

- Add tasks
- Mark tasks as completed
- Filter tasks (All, Active, Completed)
- Clear all completed tasks
- Display count of uncompleted tasks

App (управляет состояниями и таймером)
├── state:
│   ├── tasks: Array
│   ├── filter: String
│   ├── isPaused: Boolean
│   ├── activeTaskId: Number
├── methods:
│   ├── addTaskItem(text, min, sec)
│   ├── deleteTaskItem(id)
│   ├── editTaskItem(id, newText)
│   ├── toggleTaskItem(id)
│   ├── updateTime()
│   ├── startTimer(id)
│   ├── stopTimer()
│   ├── setFilter(filter)
│   ├── clearCompleted()
│
├── <NewTaskForm onAdded={this.addTaskItem} />
├── <TaskList
│       tasks={filteredTasks}
│       onDeleted={this.deleteTaskItem}
│       onEdited={this.editTaskItem}
│       onToggle={this.toggleTaskItem}
│       onUpdateTime={this.updateTime}
│       isPaused={this.state.isPaused}
│       activeTaskId={this.state.activeTaskId}
│       startTimer={this.startTimer}
│       stopTimer={this.stopTimer} />
│
└── <Footer
        clearCompleted={this.clearCompleted}
        filterItems={this.filterItems}
        setFilter={this.setFilter}
        count={countItemsCompleted} />
