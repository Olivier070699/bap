import React, { Component } from 'react'
import firebase from '../../../config/firebase'
import '../../../style/_general.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle  } from '@fortawesome/free-solid-svg-icons'

// COMPONENTS
import LogoutBtn from '../../components/Logout'
import Navigation from '../../components/Navigation'
import PageTitle from '../../components/PageTitle'

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
                    <PageTitle/>
                    <p>Goeiemorgen John</p>
                </div>
                <div className="container-work-body">
                    <div className="navigation">
                        <Navigation />
                        <div className="navigation-child"></div>
                    </div>
                    <div className="work-body">
                        <FontAwesomeIcon
                            icon={faPlusCircle}
                            className="icon-add"
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Index
