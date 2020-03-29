import React, { Component } from 'react'
import firebase from '../../../config/firebase'
import '../../../style/_general.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt,  } from '@fortawesome/free-solid-svg-icons'

// COMPONENTS
import LogoutBtn from '../../components/Logout'
import Navigation from '../../components/Navigation'
import Header from '../../components/Header'
// var user = firebase.auth().currentUser;
// var name, email, photoUrl, uid, emailVerified;

// if (user != null) {
//   name = user.displayName;
//   email = user.email;
//   photoUrl = user.photoURL;
//   emailVerified = user.emailVerified;
//   uid = user.uid; 
// }

export class Index extends Component {

    render() {
        return (
            <div>
                <div className="header-dashboard">
                    <Header />
                    <LogoutBtn/>
                </div>
                <div className="container-work-body">
                    <div className="navigation">
                        <Navigation />
                        <div className="navigation-child"></div>
                    </div>
                    <div className="work-body">
                    </div>
                </div>
            </div>
        )
    }
}

export default Index
