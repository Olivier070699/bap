import React, { Component } from 'react'
import firebase from '../../config/firebase'

export class Logout extends Component {
    
    logout() {
        firebase.auth().signOut()
            .then((response) => {
                console.log(response)
                window.location.href = '/'
            })
            .catch((error) => {
                console.log(error)
            });
    }
    
    render() {
        return (
            <button onClick={this.logout}>Logout</button>
        )
    }
}

export default Logout
