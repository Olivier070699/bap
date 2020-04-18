import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import '../../style/_general.scss'

export class Navigation_mobile extends Component {
    
    openNav = (e) => {
        document.querySelector('.container-mobile-navigation ul').style.display = 'flex'
        document.querySelector('.open').classList.add('hide')
        document.querySelector('.close').classList.remove('hide')
    }

    closeNav = (e) => {
        document.querySelector('.container-mobile-navigation ul').style.display = 'none'
        document.querySelector('.close').classList.add('hide')
        document.querySelector('.open').classList.remove('hide')
    }
    
    render() {
        return (
            <div className="container-mobile-navigation">
                <FontAwesomeIcon
                    icon={faBars}
                    onClick={this.openNav}
                    className="icon-mobile-nav open"
                />

                <FontAwesomeIcon
                    icon={faTimes}
                    onClick={this.closeNav}
                    className="icon-mobile-nav hide close"
                />

                <ul>
                    <div>
                        <li><a href="/dashboard-agency">dashboard</a></li>
                        <li><a href="/artist-agency">artist</a></li>
                        <li><a href="/client-agency">client</a></li>
                        <li><a href="/calendar-agency">calendar</a></li>
                        <li><a href="/settings-agency">settings</a></li>
                    </div>
                </ul>
            </div>
        )
    }
}

export default Navigation_mobile