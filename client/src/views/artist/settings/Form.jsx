import React, { Component } from 'react'
import firebase from '../../../config/firebase'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export class Form extends Component {
    
    state = {
        email: '',
        password: '',
    }
    
    componentDidMount = () => {
        let uid = localStorage.getItem('uid')
        let uid_db = localStorage.getItem('artist_db_key')
        let artistKey = localStorage.getItem('artist_key')

        firebase.database().ref(`artist/${artistKey}`).on('value', snap => {
            const data = snap.val()
            document.getElementById('artistname').value = data.artist_name
            document.getElementById('bio').innerHTML = data.bio
        })

        firebase.database().ref(`user/${uid_db}`).on('value', snap => {
            const data = snap.val()
            document.getElementById('adres').value = data.adres
            document.getElementById('tel').value = data.tel
            document.getElementById('email').value = data.email
        })
    }

    logChanges = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    updateProfile = (e) => {
        e.preventDefault()
        
        let uid_db = localStorage.getItem('artist_db_key')
        let artistKey = localStorage.getItem('artist_key')

        firebase.database().ref(`artist/${artistKey}`).update({
            artist_name: document.getElementById('artistname').value,
            bio: document.getElementById('bio').value
        })

        firebase.database().ref(`artist/${uid_db}`).update({
            adres: document.getElementById('adres').value,
            tel: document.getElementById('tel').value,
            email: document.getElementById('email').value,
        })
        .then(() => {    
            NotificationManager.success('Update is successfully done.', 'Succeeded!');
        })
    }
    
    render() {
        return (
            <div className="container-settings">
                <form onSubmit={this.updateProfile}>
                    <input id="artistname" type="text" placeholder="artist name" required/>
                    <textarea id="bio" placeholder="bio" required>

                    </textarea>
                    <input id="adres" type="text" placeholder="adres" required/>
                    <input id="tel" type="number" placeholder="tel" required/>

                    <input id="email" type="email" placeholder="email"/>
                    <input id="password" type="password" placeholder="xxxxxxxxxx"/>
                    
                    <button>update</button>
                </form>
                <NotificationContainer />
            </div>
        )
    }
}

export default Form

// NotificationManager.info('Info message');
// NotificationManager.success('Success message', 'Title here');
// NotificationManager.error('Success message', 'Title here');
