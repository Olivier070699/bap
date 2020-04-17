import React, { Component } from 'react'
import firebase from '../../../config/firebase'
import '../../../style/_general.scss'
import List from './List'

// COMPONENTS
import Navigation from '../../components/Navigation_artist'
import Header from '../../components/Header'
import Notifications from '../components/Notifications'

export class Index extends Component {

    componentWillMount = () => {
        let userID = localStorage.getItem('uid')
        firebase.database().ref('artist').on('value', snap => {
            snap.forEach(childSnap => {
                const data = childSnap.val()
                if (data.user_id === userID) {
                    localStorage.setItem('artist_key', childSnap.key)
                    localStorage.setItem('agency_key', data.agency_key)
                    localStorage.setItem('artist_db_key', data.db_user_id)
                }
            });
        })
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
                    </div>
                    <div className="work-body">
                        <Notifications/>
                        <List/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Index
