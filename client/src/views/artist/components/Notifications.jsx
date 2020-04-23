import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import '../../../style/_general.scss'
import firebase from '../../../config/firebase'

export class Notifications extends Component {

    state = {
        view: false,
        length: ''
    }

    componentDidMount = () => {
        document.querySelector('.container-notifications-content').classList.add('hide')
        let uid = localStorage.getItem('uid')
        firebase.database().ref('invite_artist').on('value', snap => {
            document.querySelector('.container-notifications-content ul').innerHTML = ''
            let amountInvitations = []
            snap.forEach(childSnap => {
                const data = childSnap.val()
                if (data.artist_id === uid) {
                    console.log(data.artist_id, uid)
                    let content = `<li  id="${childSnap.key}">${data.agency_name} invited you to join them <button class="btn-accept" id="${data.agency_key}">accept</button> <button class="btn-remove">remove</button></li>`
                    document.querySelector('.container-notifications-content ul').insertAdjacentHTML('beforeend', content)
                    amountInvitations.push(data.artist_id)
                }
            });
            let length = amountInvitations.length
            document.querySelector('.amount-of-notifications').innerHTML = length
            this.setState({
                length,
            })
            this.renderEventListeners()
        })
    }

    renderEventListeners = () => {
        let acceptBtns = document.querySelectorAll('.btn-accept')
        acceptBtns.forEach(acceptBtn => {
            acceptBtn.addEventListener('click', this.acceptInvitation)
        });

        let removeBtns = document.querySelectorAll('.btn-remove')
        removeBtns.forEach(removeBtn => {
            removeBtn.addEventListener('click', this.removeInvitation)
        });

        let notificationIcon = document.querySelector('.notification-icon')
        notificationIcon.addEventListener('click', this.toggleView)
    }

    acceptInvitation = (e) => {
        let artistKey = localStorage.getItem('artist_key')
        firebase.database().ref(`artist/${artistKey}`).update({
            agency_key: e.target.id
        })
        firebase.database().ref(`invite_artist/${e.target.parentNode.id}`).remove()
    }

    removeInvitation = (e) => {
        firebase.database().ref(`invite_artist/${e.target.parentNode.id}`).remove()
    }

    toggleView = () => {
        if (this.state.view === false && this.state.length !== 0) {
            document.querySelector('.container-notifications-content').classList.remove('hide')
            this.setState({
                view: true
            })
        } else if (this.state.view === true && this.state.length !== 0) {
            document.querySelector('.container-notifications-content').classList.add('hide')
            this.setState({
                view: false
            })
        }
    }

    render() {
        return (
            <div>
                <div className="container-notifications-icon">
                    <div className="amount-of-notifications"></div>
                    <FontAwesomeIcon
                        icon={faBell}
                        className="notification-icon"  
                    />
                </div>
                <div className="container-notifications-content">
                    <ul></ul>
                </div>
            </div>
        )
    }
}

export default Notifications

// IF NOTIFICATION = 0, HIDE section