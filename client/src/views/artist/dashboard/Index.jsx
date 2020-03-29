import React, { Component } from 'react'
import firebase from '../../../config/firebase'

// COMPONENTS
import Notifications from '../components/Notifications'

export class Index extends Component {
    
    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                window.location = '/login'
            }
            let uid = user.uid
            localStorage.setItem('uid', uid)

            // AGENCY ID
            firebase.database().ref('/artist').on('value', snap => {
                snap.forEach((childSnapshot) => {
                    const data = childSnapshot.val();
                    if (data.user_id === uid) {
                        localStorage.setItem('artist_id', data.id)
                        localStorage.setItem('artist_name', data.agency_name)
                        localStorage.setItem('artist_key', childSnapshot.key)
                    }
              });
            });
        });
    }
    
    render() {
        return (
            <div>
                <div>
                    <h2>Dashboard</h2>
                    <p>Goeiemorgen John</p>
                </div>
                <div>
                    <ul>
                        <li>Dashboard</li>
                        <li>Agenda</li>
                        <li>Artists</li>
                        <li>Klanten</li>
                        <li>Settings</li>
                    </ul>
                </div>
                <div>
                    <Notifications/>
                </div>
            </div>
        )
    }
}

export default Index
