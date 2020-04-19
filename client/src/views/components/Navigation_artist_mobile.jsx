import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import '../../style/_general.scss'
import firebase from '../../config/firebase'

export class Navigation_artist_mobile extends Component {
    
    openNav = (e) => {
        document.querySelector('.container-mobile-navigation ul').style.display = 'flex'
        document.querySelector('.open').classList.add('hide')
        document.querySelector('.close').classList.remove('hide')
    }

    closeNav = (e) => {
        document.querySelector('.container-mobile-navigation ul').style.display = 'none'
        document.querySelector('.close').classList.add('hide')
        document.querySelector('.open').classList.remove('hide')
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
    
    render() {
        return (
            <div className="container-mobile-navigation">
                <FontAwesomeIcon
                    icon={faBars}
                    onClick={this.openNav}
                    className="icon-mobile-nav open"
                />

                <FontAwesomeIcon
                    icon={faTimes}
                    onClick={this.closeNav}
                    className="icon-mobile-nav hide close"
                />

                <ul>
                    <div>
                        <li><a href="/dashboard-artist">dashboard</a></li>
                        <li><a href="/calendar-artist">calendar</a></li>
                        <li><a href="/settings-artist">settings</a></li>
                        <li className="responsive-logout" onClick={this.logout}>logout</li>
                    </div>
                </ul>
            </div>
        )
    }
}

export default Navigation_artist_mobile
