import React, { Component } from 'react'
import firebase from '../../config/firebase'
import '../../style/_general.scss'

export class Register extends Component {
    
    logInfo = (e) => {
        let id = e.target.id
        this.setState({
            [id]: e.target.value
        })
    }

    userType = () => {
        let btns = document.querySelectorAll('.user-type')
        let login_agency = document.querySelector('.login-agency')
        let login_artist = document.querySelector('.login-artist')
        for (let i = 0; i < btns.length; i++){
            if (btns[i].checked) {
                console.log(btns[i].value)
                if (btns[i].value === 'agency') {
                    login_agency.classList.remove('hide')
                    login_artist.classList.add('hide')
                } else {
                    login_agency.classList.add('hide')
                    login_artist.classList.remove('hide')
                }
            }
        }
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
                        <div className="login-title"><h2>Register</h2><a href="/login">Log in</a></div>
                        <form id="login-form" onSubmit={this.submitForm}>
                            <input id="name" type="text" placeholder="name" required onChange={this.logInfo}/>
                            <input id="email" type="email" placeholder="example@email.com" required onChange={this.logInfo}/>
                            <input id="password" type="password" placeholder="xxxxxxxxxx" required onChange={this.logInfo} />
                            <input id="tel" type="tel" placeholder="tel" required onChange={this.logInfo} />
                            <input id="adress" type="text" placeholder="adres" required onChange={this.logInfo} />
                            <input id="country" type="country" placeholder="country" required onChange={this.logInfo} />

                            <div className="login-agency hide">
                                <input id="agency_name" type="text" placeholder="agency name" required onChange={this.logInfo} />
                                <input id="bookingsfee" type="number" placeholder="bookingsfee (%)" required onChange={this.logInfo} />    
                            </div>

                            <div className="login-artist hide">
                                <input id="artist_name" type="text" placeholder="artist name" required onChange={this.logInfo} />
                                <input id="date_of_birth" type="date" placeholder="date of birth" required onChange={this.logInfo}/>
                            </div>

                            <div className="login-radio-btns">
                                <input className="user-type" type="radio" name="drone" value="agency" onChange={this.userType} required/>
                                <label for="agency">agency</label>

                                <input className="user-type" type="radio" name="drone" value="artist" onChange={this.userType} required/>
                                <label for="artist">artist</label>
                            </div>

                            <button>Register</button>
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

export default Register
