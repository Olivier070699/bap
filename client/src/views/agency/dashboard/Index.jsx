import React, { Component } from 'react'
import firebase from '../../../config/firebase'
import '../../../style/_general.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt,  } from '@fortawesome/free-solid-svg-icons'

// COMPONENTS
import Navigation from '../../components/Navigation'
import Header from '../../components/Header'
import Clock from './components/Clock'
import Todo from './components/Todo'

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
                        <div className="container-dashboard-work-body">
                            <section className="container-dashboard-left"></section>
                            <section className="container-dashboard-right">
                                <Clock />
                                <Todo/>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Index
