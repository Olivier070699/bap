import React, { Component } from 'react'
import firebase from '../../../config/firebase'

export class Notifications extends Component {
    
    state = {
        userID: '',
    }
    
    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                window.location = '/login'
            }
            this.setState({
                userID: user.uid,
            })
        })

        firebase.database().ref('invite_artist').on('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                  const data = childSnapshot.val();
                if (data.artist_id === this.state.userID) {
                        let notification = `<p>${data.agency_name} invited you to join them</p><button id="${data.agency_key}" class="notification">accept</button>`
                        document.querySelector('.notification-content').innerHTML = notification
                  }
            });
        });
        
       setTimeout(() => {
        let notificiationBtns = document.querySelectorAll('.notification')
        notificiationBtns.forEach(notificiationBtn => {
            notificiationBtn.addEventListener('click', this.acceptAgency)
        });
       }, 1500);
    }

    acceptAgency = (e) => {
        let agencyKey = e.target.id
        let artistKey = localStorage.getItem('artist_key')
        console.log('agency key: ' + agencyKey)
        firebase.database().ref(`artist/${artistKey}`).update({
            agency_key: agencyKey,
        })
    }

    render() {
        return (
            <div>
                <div className="notification-content"></div>
            </div>
        )
    }
}

export default Notifications
