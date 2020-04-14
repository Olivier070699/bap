import React, { Component } from 'react'

export class Todo extends Component {

    componentDidMount = () => {
        let tasks = document.querySelectorAll('.task')
        tasks.forEach(task => {
            task.addEventListener('click', this.markTask)
        });
    }

    markTask = (e) => {
        if (e.target.classList.contains('task-done')) {
            e.target.classList.remove('task-done')   
        } else {
            e.target.classList.add('task-done')   
        }
    }

    render() {
        return (
            <div className="container-todo">
                <h2>To do list</h2>
                <div>
                    <div className="task">agenda punt</div>
                    <div className="task">agenda punt</div>
                    <div className="task">agenda punt</div>
                    <div className="task">agenda punt</div>
                    <div className="task">agenda punt</div>
                    <div className="task">agenda punt</div>
                    <div className="task">agenda punt</div>
                    <div className="task">agenda punt</div>
                    <div className="task">agenda punt</div>
                </div>
            </div>
        )
    }
}

export default Todo
