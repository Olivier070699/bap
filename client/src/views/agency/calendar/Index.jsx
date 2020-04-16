import React, { Component } from 'react'
import firebase from '../../../config/firebase'
import '../../../style/_general.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faPenSquare, faTimesCircle  } from '@fortawesome/free-solid-svg-icons'


// COMPONENTS
import Navigation from '../../components/Navigation'
import Header from '../../components/Header'

// CALENDAR COMPONENTS
import AddDate from './AddDate'


export class Index extends Component {
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
                        <AddDate />
                    </div>
                </div>
            </div>
        )
    }
}

export default Index
