import React, { Component } from 'react'
import firebase from '../../config/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

export class Logout extends Component {

    state = {
        btn_status: false,
    }

    toggleLogout = () => {
        let currentStatus = this.state.btn_status
        if (!currentStatus) {
            document.querySelector('.btn-logout').classList.remove('hide')
            this.setState({
                btn_status: true
            })
        } else {
            document.querySelector('.btn-logout').classList.add('hide')
            this.setState({
                btn_status: false
            })
        }
    }

    logout() {
        firebase.auth().signOut()
            .then((response) => {
                console.log(response)
                window.localStorage.clear()
                window.location.href = '/'
            })
            .catch((error) => {
                console.log(error)
            });
    }
    
    render() {
        return (
            <div className="container-logout">
                <FontAwesomeIcon
                    icon={faCaretDown}
                    className="icon-add"
                    onClick={this.toggleLogout}
                />
                <button className="btn-logout hide" onClick={this.logout}>Logout</button>
            </div>
        )
    }
}

export default Logout
