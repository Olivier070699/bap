import React, { Component } from 'react'
import firebase from '../../config/firebase'
import PageTitle from './PageTitle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown } from '@fortawesome/free-solid-svg-icons'

export class Header extends Component {
    
    state = {
        email: '',
        name: '',
        statusMenu: 'hide',
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            // console.log(user)
            if (!user) {
                window.location = '/login'
            }

            let type
            firebase.database().ref('user').on('value', snap => {
                snap.forEach(childSnap => {
                    if (childSnap.val().id === user.uid) {
                        type = childSnap.val().type
                    }
                });
                if (!window.location.pathname.includes(type)) {
                    window.location = `/dashboard-${type}`
                }
            })

            let email = user.email
            let name = user.displayName
            let uid = user.uid
            localStorage.setItem('uid', uid)
            this.setState({
                email,
                name,
            })
            document.querySelector('.claim').innerHTML = "Hello " + this.state.name

            // AGENCY ID
            firebase.database().ref('/agency').on('value', snap => {
                snap.forEach((childSnapshot) => {
                    const data = childSnapshot.val();
                    if (data.user_id === uid) {
                        localStorage.setItem('agency_id', data.id)
                        localStorage.setItem('agency_name', data.agency_name)
                        localStorage.setItem('agency_key', childSnapshot.key)
                    }
              });
            });

            // ARTIST ID
            firebase.database().ref('artist').on('value', snap => {
                snap.forEach(childSnap => {
                    const data = childSnap.val()
                    if (data.user_id === uid) {
                        localStorage.setItem('artist_key', childSnap.key)
                        localStorage.setItem('agency_key', data.agency_key)
                        localStorage.setItem('artist_db_key', data.db_user_id)
                    }
                });
            })
        });
    }

    logout = () => {
        localStorage.clear();
            firebase.auth().signOut()
            .then((response) => {
                console.log(response)
                window.location.href = '/'
            })
            .catch((error) => {
                console.log(error)
            });
    }

    toggleMenu = () => {
        if (this.state.statusMenu === 'hide') {
            this.setState({
                statusMenu: ''
            })
            document.querySelector('.dropdown-menu ul').classList.remove('hide')
        } else {
            this.setState({
                statusMenu: 'hide'
            })
            document.querySelector('.dropdown-menu ul').classList.add('hide')
        }
    }
    
    render() {
        return (
            <div>
                <PageTitle/>
                <div className="dropdown-menu">
                    <p className="claim"></p>
                    <FontAwesomeIcon
                    icon={faSortDown}
                    className="icon-dropdown"
                    onClick={this.toggleMenu}
                />
                    <ul className="hide">
                        <li>Privacy Policy</li>
                        <li onClick={this.logout}>Logout</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Header
