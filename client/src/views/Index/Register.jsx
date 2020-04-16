import React, { Component } from 'react'
import firebase from '../../config/firebase'
import '../../style/_general.scss'

import Index_RightSideView from './components/Index_RightSide'

export class Register extends Component {

    componentDidMount() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        
        const db = firebase.database()
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
        let user_id
        const auth = firebase.auth()
        const promise = auth.createUserWithEmailAndPassword(this.state.email, this.state.password);
        promise
            .then((result) => {
                this.setState({
                    user_id: result.user.uid
                })
                user_id =  result.user.uid
                return result.user.updateProfile({
                    displayName: this.state.name,
                })
          })
          .catch((error) => {
            const errorMessage = error.message
            document.querySelector('.error-message').classList.remove('hide')
            document.querySelector('.error-message').innerHTML = errorMessage;
          });
        
        setTimeout(() => {
            // SECOND LOG USER (id, name, email, adres, country, tel, type)
        firebase.database().ref('user').push({
            name: this.state.name,
            email: this.state.email,
            adres: this.state.adress,
            country: this.state.country,
            tel: this.state.tel,
            type: this.state.type,
            id: user_id,
        })
            .then((result) => {
                // THIRD REGISTER TYPE
                // 
                //  AGENCY -> (id, user_id, agency_name, bookingsfee)
                if (this.state.type === 'agency') {
                    firebase.database().ref('agency').push({
                        id: this.state.agency_id,
                        user_id: this.state.user_id,
                        db_user_id:  result.path.pieces_[1],
                        agency_name: this.state.agency_name,
                        bookingsfee: this.state.bookingsfee,
                    })
                }
                // ARTIST -> (id, user_id, artist_name, label_id, price, bio, date_of_birth, agency_id)
                else {
                    firebase.database().ref('artist').push({
                        id: this.state.artist_id,
                        user_id: this.state.user_id,
                        db_user_id: result.path.pieces_[1],
                        artist_name: this.state.artist_name,
                        label_id: '',
                        price: '',
                        bio: '',
                        date_of_birth: this.state.date_of_birth,
                        agency_key: '',
                    })
                }
        })
        document.getElementById('login-form').reset()
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
              window.location = `/dashboard-${this.state.type}`
            }
        });
        }, 1500);
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
// CREATED ON