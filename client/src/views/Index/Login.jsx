import React, { Component } from 'react'
import firebase from '../../config/firebase'
import '../../style/_general.scss'

export class Login extends Component {
    
    logInfo = (e) => {
        let id = e.target.id
        this.setState({
            [id]: e.target.value
        })
    }

    submitForm = (e) => {
        e.preventDefault()
        console.log(this.state)
        document.getElementById('login-form').reset()
    }
    
    render() {
        return (
            <div className="container-login">
                <div className="login-left-side">
                    <div className="login-left-side-child">
                        <div className="login-title"><h2>Log in</h2><a href="/register">Register</a></div>
                        <form id="login-form" onSubmit = {this.submitForm}>
                            <input id="email" type="email" placeholder="example@email.com" required onChange={this.logInfo}/>
                            <input id="password" type="password" placeholder="xxxxxxxxxx" required onChange={this.logInfo}/>
                            <button>Log in</button>
                        </form>
                    </div>
                </div>
                <div className="login-right-side">
                    <div className="login-right-side-child">
                        <h1>Lorem <br />ipsum<br />dolarium!</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor recusandae nesciunt ea consequatur temporibus esse animi, qui nisi eaque soluta, rerum modi, corporis dolorem mollitia explicabo sequi cumque aliquam. Consequatur?</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
