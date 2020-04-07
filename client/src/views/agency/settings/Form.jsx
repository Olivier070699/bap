import React, { Component } from 'react'
import firebase from '../../../config/firebase'

export class Form extends Component {
    
    state = {
        db_uid: '',
        uid: '',
        agency_id: '',
    }
    
    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            document.getElementById('email').value = user.email
            this.setState({
                uid: user.uid,
            })

            firebase.database().ref(`user`).on('value', snapshot => {
                snapshot.forEach((childSnapshot) => {
                    const data = childSnapshot.val();
                    if (user.uid === data.id) {
                        this.setState({
                            db_uid: childSnapshot.key
                        })
                        document.getElementById('adres').value = data.adres
                        document.getElementById('tel').value = data.tel
                    }
              });
            })

            firebase.database().ref(`agency`).on('value', snapshot => {
                snapshot.forEach((childSnapshot) => {
                    const data = childSnapshot.val();
                    if (user.uid === data.user_id) {
                        this.setState({
                            agency_id: childSnapshot.key
                        })
                        document.getElementById('agency_name').value = data.agency_name
                        document.getElementById('bookingsfee').value = data.bookingsfee
                    }
              });
            })
        });
    }

    updateProfile = (e) => {
        e.preventDefault()
        let agency_name = document.getElementById('agency_name').value
        let bookingsfee = document.getElementById('bookingsfee').value
        let adres = document.getElementById('adres').value
        let tel = document.getElementById('tel').value
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value
        
        // UPDATE ACCOUNT
        var user = firebase.auth().currentUser;
        user.updateEmail(email)
        if (password) {
            user.updatePassword(password)
        }

        // UPDATE DB
        firebase.database().ref(`user/${this.state.db_uid}`).update({
            adres,
            tel,
            email,
        })

        firebase.database().ref(`agency/${this.state.agency_id}`).update({
            agency_name,
            bookingsfee,
        })
    }
    render() {
        return (
            <div className="container-settings">
                <form onSubmit={this.updateProfile}>
                    <input id="agency_name" type="text" placeholder="agency name" />
                    <input id="bookingsfee" type="number" placeholder="bookingsfee (%)" />
                    <input id="adres" type="text" placeholder="adres" />
                    <input id="tel" type="number" placeholder="tel" />

                    <input id="email" type="email" placeholder="email" />
                    <input id="password" type="password" placeholder="xxxxxxxxxx" />
                    
                    <button>update</button>
                </form>
            </div>
        )
    }
}

export default Form

// BACK TO LOGIN AFTER CHANGE PASSWORD ISN'T RIGHT