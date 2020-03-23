import React, { Component } from 'react'
import firebase from '../../config/firebase'
import '../../style/_general.scss'

import Index_RightSideView from './components/Index_RightSide'


export class Login extends Component {
    
    logInfo = (e) => {
        let id = e.target.id
        this.setState({
            [id]: e.target.value
        })
    }

    submitForm = (e) => {
        e.preventDefault()
        let form = document.getElementById('login-form')

        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(this.state.email, this.state.password);
        promise
            .then((response) => {
                document.querySelector('.error-message').classList.add('hide')
                const raw = firebase.database().ref('user');
                raw.on('value', (snapshot) => {
                  snapshot.forEach((childSnapshot) => {
                    const data = childSnapshot.val();
                      
                    if (data.email.toLowerCase() === this.state.email.toLowerCase()) {
                        let type = data.type.toLowerCase()
                        console.log(type)
                        this.setState({ 
                            type: type,
                        })
                        window.location.href = `/dashboard-${type}`
                    }
                  });
                });
            })
            .catch((error) => {
                const errorMessage = error.message
                document.querySelector('.error-message').classList.remove('hide')
                document.querySelector('.error-message').innerHTML = errorMessage;
            });
    }
    
    render() {
        return (
            <div className="container-login">
                <div className="login-left-side">
                    <div className="login-left-side-child">
                        <div className="login-title"><h2>Log in</h2><a href="/register">Register</a></div>
                        <form id="login-form" onSubmit = {this.submitForm}>
                            <input id="email" type="email" placeholder="example@email.com" required onChange={this.logInfo}/>
                            <input id="password" type="password" placeholder="xxxxxxxxxx" required onChange={this.logInfo} />
                            <p className="error-message hide"></p>
                            <button>Log in</button>
                        </form>
                    </div>
                </div>
                <div className="login-right-side">
                    <Index_RightSideView/>
                </div>
            </div>
        )
    }
}

export default Login

// CHECK USER TYPE FOR REDERECTING TO PAGE (DASHBOARD OR AGENDA)