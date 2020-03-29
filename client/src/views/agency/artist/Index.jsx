import React, { Component } from 'react'
import firebase from '../../../config/firebase'
import '../../../style/_general.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle  } from '@fortawesome/free-solid-svg-icons'

// COMPONENTS
import LogoutBtn from '../../components/Logout'
import Navigation from '../../components/Navigation'
import Header from '../../components/Header'

// PAGES
import AddNewArtist from './AddNewArtist'
import ShowOwnArtist from './ShowOwnArtist'
import EditArtist from './EditArtist'

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

    addNewArtist = () => {
        document.querySelector('.container-addNewArtist').classList.remove('hide')
        document.querySelector('.tooltip-add-artist').classList.add('hide')
        document.querySelector('.container-showOwnArtist').classList.add('hide')
    }

    render() {
        return (
            <div>
                <div className="header-dashboard">
                    <Header/>
                </div>
                <div className="container-work-body">
                    <div className="navigation">
                        <Navigation />
                        <div className="navigation-child"></div>
                    </div>
                    <div className="work-body">
                        <div className="tooltip-add-artist">
                            <span className="tooltiptext-left">add new artist</span>
                            <FontAwesomeIcon
                                icon={faPlusCircle}
                                className="icon-add"
                                onClick={this.addNewArtist}
                            />
                        </div>
                        <ShowOwnArtist/>
                        <AddNewArtist/>
                        <EditArtist/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Index
