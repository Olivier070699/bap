import React, { Component } from 'react'
import firebase from '../../../config/firebase'
import '../../../style/_general.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt,  } from '@fortawesome/free-solid-svg-icons'

// COMPONENTS
import Navigation from '../../components/Navigation'
import Header from '../../components/Header'
import Form from './Form'

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
                        <Form />
                    </div>
                </div>
            </div>
        )
    }
}

export default Index
