import React, { Component } from 'react'
import firebase from '../../../config/firebase'
import '../../../style/_general.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faPenSquare, faTimesCircle  } from '@fortawesome/free-solid-svg-icons'
import MobileNav from '../../components/Navigation_mobile'

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
        document.querySelector('.container-action-btns').classList.add('hide')
        document.querySelector('.container-showOwnArtist').classList.add('hide')
        document.querySelector('.close-btn').classList.remove('hide')
    }

    editArtist = () => {
        document.querySelector('.container-addNewArtist').classList.add('hide')
        document.querySelector('.container-showOwnArtist').classList.add('hide')
        document.querySelector('.container-edit-artist').classList.remove('hide')
        document.querySelector('.container-action-btns').classList.add('hide')
        document.querySelector('.close-btn').classList.remove('hide')
    }

    close() {
        document.querySelector('.container-action-btns').classList.remove('hide')
        document.querySelector('.container-showOwnArtist').classList.remove('hide')
        document.querySelector('.container-edit-artist').classList.add('hide')
        document.querySelector('.container-addNewArtist').classList.add('hide')
        document.querySelector('.close-btn').classList.add('hide')
    }

    render() {
        return (
            <div>
                <MobileNav />
                <div className="header-dashboard">
                    <Header/>
                </div>
                <div className="container-work-body">
                    <div className="navigation">
                        <Navigation />
                    </div>
                    <div className="work-body">
                        
                        <div className="container-action-btns">
                            <div className="tooltip-add-artist top-btn">
                                <span className="tooltiptext-left">edit artist</span>
                                <FontAwesomeIcon
                                    icon={faPenSquare}
                                    className="icon-add"
                                    onClick={this.editArtist}
                                />
                            </div>
                            <div className="tooltip-add-artist">
                                <span className="tooltiptext-left">add new artist</span>
                                <FontAwesomeIcon
                                    icon={faPlusCircle}
                                    className="icon-add"
                                    onClick={this.addNewArtist}
                                />
                            </div>
                        </div>

                        <div className="tooltip-add-artist close-btn hide">
                            <span className="tooltiptext-left">close</span>
                            <FontAwesomeIcon
                                icon={faTimesCircle}
                                className="icon-add"
                                onClick={this.close}
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
