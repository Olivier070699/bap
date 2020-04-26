import React, { Component } from 'react'
import '../../../style/_general.scss'

// COMPONENTS
import Navigation from '../../components/Navigation'
import Header from '../../components/Header'
import Form from './Form'
import MobileNav from '../../components/Navigation_mobile'

export class Index extends Component {

    render() {
        return (
            <div>
                <MobileNav/>
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
