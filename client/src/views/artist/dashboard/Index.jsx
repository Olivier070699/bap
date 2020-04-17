import React, { Component } from 'react'
import firebase from '../../../config/firebase'
import '../../../style/_general.scss'
import List from './List'

// COMPONENTS
import Navigation from '../../components/Navigation_artist'
import Header from '../../components/Header'

export class Index extends Component {

    componentWillMount = () => {
        let userID = localStorage.getItem('uid')
        firebase.database().ref('artist').on('value', snap => {
            snap.forEach(childSnap => {
                const data = childSnap.val()
                if (data.user_id === userID) {
                    localStorage.setItem('artist_key', childSnap.key)
                    localStorage.setItem('agency_key', data.agency_key)
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
                        <List/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Index
