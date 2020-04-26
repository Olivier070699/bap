import React, { Component } from 'react'
import '../../../style/_general.scss'
import List from './List'

// COMPONENTS
import Navigation from '../../components/Navigation_artist'
import Header from '../../components/Header'
import Notifications from '../components/Notifications'
import ResponsiveNav from '../../components/Navigation_artist_mobile'

export class Index extends Component {

    render() {
        return (
            <div>
                <ResponsiveNav/>
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
