import React, { Component } from 'react'
import firebase from '../../config/firebase'
import '../../style/_general.scss'

import Index_RightSideView from './components/Index_RightSide'

export class Register extends Component {

    componentDidMount() {
        const db = firebase.database()
        const findUserId = db.ref('user');
        findUserId.on('value', (snapshot) => {
            const user_id = snapshot.numChildren();
            this.setState({
                user_id: user_id +1
            })
        });

        const findAgencyId = db.ref('agency');
        findAgencyId.on('value', (snapshot) => {
            const agency_id = snapshot.numChildren();
            this.setState({
                agency_id: agency_id +1
            })
        });
        
            const findArtistId = db.ref('artist');
            findArtistId.on('value', (snapshot) => {
            const artist_id = snapshot.numChildren();
            this.setState({
                artist_id: artist_id +1
            })
        });
    }
    
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
                this.setState({
                    type: btns[i].value
                })
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
        // ID = firebase.key
        // FIST CREATE USER (email, password)
        const auth = firebase.auth()
        const promise = auth.createUserWithEmailAndPassword(this.state.email, this.state.password);
        promise
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            const errorMessage = error.message
            document.querySelector('.error-message').classList.remove('hide')
            document.querySelector('.error-message').innerHTML = errorMessage;
          });
        
        // SECOND LOG USER (id, name, email, adres, country, tel, type)
        firebase.database().ref('user').push({
            id: this.state.user_id,
            name: this.state.name,
            email: this.state.email,
            adres: this.state.adress,
            country: this.state.country,
            tel: this.state.tel,
            type: this.state.type
        })

        // THIRD REGISTER TYPE
        // 
        //  AGENCY -> (id, user_id, agency_name, bookingsfee)
        if (this.state.type === 'agency') {
            firebase.database().ref('agency').push({
                id: this.state.agency_id,
                user_id: this.state.user_id,
                agency_name: this.state.agency_name,
                bookingsfee: this.state.bookingsfee,
            })
        }
        // ARTIST -> (id, user_id, artist_name, label_id, price, bio, date_of_birth, agency_id)
        else {
            firebase.database().ref('artist').push({
                id: this.state.artist_id,
                user_id: this.state.user_id,
                artist_name: this.state.artist_name,
                label_id: '',
                price: '',
                bio: '',
                date_of_birth: this.state.date_of_birth,
                agency_id: '',
            })
        }
        document.getElementById('login-form').reset()
        window.location.href = `/dashboard-${this.state.type}`
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
                            <input id="tel" type="number" placeholder="tel" required onChange={this.logInfo} />
                            <input id="adress" type="text" placeholder="adres" required onChange={this.logInfo} />
                            <input id="country" type="country" placeholder="country" required onChange={this.logInfo} />

                            <div className="login-agency hide">
                                <input id="agency_name" type="text" placeholder="agency name" onChange={this.logInfo} />
                                <input id="bookingsfee" type="number" placeholder="bookingsfee (%)" onChange={this.logInfo} />    
                            </div>

                            <div className="login-artist hide">
                                <input id="artist_name" type="text" placeholder="artist name" onChange={this.logInfo} />
                                <input id="date_of_birth" type="date" placeholder="date of birth" onChange={this.logInfo}/>
                            </div>

                            <div className="login-radio-btns">
                                <input className="user-type" type="radio" name="drone" value="agency" required onChange={this.userType}/>
                                <label for="agency">agency</label>

                                <input className="user-type" type="radio" name="drone" value="artist" required onChange={this.userType}/>
                                <label for="artist">artist</label>
                            </div>

                            <p className="error-message hide"></p>

                            <button>Register</button>
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

export default Register

// HIDE SECTIONS AREN'T REQUIRED -> MOET VERANDEREN