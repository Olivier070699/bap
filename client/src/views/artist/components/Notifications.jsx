import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import '../../../style/_general.scss'

export class Notifications extends Component {
    render() {
        return (
            <div>
                <div className="container-notifications-icon">
                    <div className="amount-of-notifications">1</div>
                    <FontAwesomeIcon
                        icon={faBell}
                        className="notification-icon"  
                    />
                </div>
                <div className="container-notifications-content">
                    <ul>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Notifications
