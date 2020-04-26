import React, { Component } from 'react'
import '../../../style/_general.scss'
import MobileNav from '../../components/Navigation_mobile'

// COMPONENTS
import Navigation from '../../components/Navigation'
import Header from '../../components/Header'

// CALENDAR COMPONENTS
import AddDate from './AddDate'


export class Index extends Component {
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
                        <AddDate />
                    </div>
                </div>
            </div>
        )
    }
}

export default Index
