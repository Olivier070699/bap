import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTimesCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import firebase from '../../../../config/firebase'


export class Todo extends Component {

    componentDidMount = () => {
        let uid
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                window.location = '/login'
            }
            uid = user.uid
            this.setState({
                uid
            })

            let tasks = document.querySelectorAll('.task')
            tasks.forEach(task => {
                task.addEventListener('click', this.markTask)
            });
            console.log(uid)
            firebase.database().ref(`todo/${uid}/`).on('value', snap => {
                document.querySelector('.container-todo div').innerHTML = ''
        
                snap.forEach(childSnap => {
                    let data = childSnap.val()
                    let content
                    if (data.inprocess === 'true') {
                        content = `<div id="${childSnap.key}" class="task">${data.task}</div>`   
                    } else {
                        content = `<div id="${childSnap.key}" class="task task-done">${data.task}</div>`   
                    }
                    document.querySelector('.container-todo div').insertAdjacentHTML('beforeend', content)
                });
                this.renderEventlisteners()
            })
        })
    }

    renderEventlisteners() {
        let tasks = document.querySelectorAll('.task')
        tasks.forEach(task => {
            task.addEventListener('click', this.markTask)
        });
    }

    markTask = (e) => {
        let taskID = e.target.id
        if (e.target.classList.contains('task-done')) {
            e.target.classList.remove('task-done')
            firebase.database().ref(`todo/${this.state.uid}/${taskID}`).update({
                inprocess: 'true'
            })
        } else {
            e.target.classList.add('task-done')  
            firebase.database().ref(`todo/${this.state.uid}/${taskID}`).update({
                inprocess: 'false'
            })
        }
    }

    // FORM
    close = () => {
        document.querySelector('.form-todo').style.display = 'none'
    }

    open = () => {
        document.querySelector('.form-todo').style.display = 'flex'
    }

    logChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    submitTask = (e) => {
        e.preventDefault()
        firebase.database().ref(`todo/${this.state.uid}`).push({
            task: this.state.task,
            inprocess: 'true',
        })
        document.querySelector('.form-todo').reset()
    }

    deleteTasks = () => {
        firebase.database().ref(`todo/${this.state.uid}`).remove()
    }

    render() {
        return (
            <div className="container-todo">
                <h2>To do list</h2>
                <div></div>
                <FontAwesomeIcon
                    icon={faPlusCircle}
                    className="icon-add-todo"
                    onClick={this.open}
                />
                <FontAwesomeIcon
                icon={faTrash}
                className="icon-trash-todo"
                onClick={this.deleteTasks}
                />

                <form className="form-todo" onSubmit={this.submitTask}>
                    <div>
                        <input id="task" placeholder="new task" required onChange={this.logChange} />
                        <button>add task</button>
                        <FontAwesomeIcon
                            icon={faTimesCircle}
                            className="icon-close-todo"
                            onClick={this.close}
                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default Todo
