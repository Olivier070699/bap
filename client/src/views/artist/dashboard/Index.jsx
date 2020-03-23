import React, { Component } from 'react'

// COMPONENTS
import LogoutBtn from '../../components/Logout'
import Navigation from '../../components/Navigation'

export class Index extends Component {
    render() {
        return (
            <div>
                <div>
                    <h2>Dashboard</h2>
                    <p>Goeiemorgen John</p>
                </div>
                <div>
                    <ul>
                        <li>Dashboard</li>
                        <li>Agenda</li>
                        <li>Artists</li>
                        <li>Klanten</li>
                        <li>Settings</li>
                    </ul>
                </div>
                <div>
                    
                </div>
            </div>
        )
    }
}

export default Index
