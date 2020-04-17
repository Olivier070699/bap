import React, { Component } from 'react'
import '../../../style/_general.scss'

// COMPONENTS
import Navigation from '../../components/Navigation_artist'
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
                        <Form/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Index
