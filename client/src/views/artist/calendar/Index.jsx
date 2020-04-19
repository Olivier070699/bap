import React, { Component } from 'react'
import firebase from '../../../config/firebase'
import '../../../style/_general.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faPenSquare, faTimesCircle  } from '@fortawesome/free-solid-svg-icons'


// COMPONENTS
import Navigation from '../../components/Navigation_artist'
import Header from '../../components/Header'
import ResponsiveNav from '../../components/Navigation_artist_mobile'

// CALENDAR COMPONENTS
import Calendar from './Calendar'


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
                        <Calendar />
                    </div>
                </div>
            </div>
        )
    }
}

export default Index
