import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWrench, faCalendar, faHandshake, faHeadphones } from '@fortawesome/free-solid-svg-icons'

export class Navigation extends Component {
    
    componentDidMount = (e) => {
        let aTags = document.querySelectorAll('.a-tag')
        aTags.forEach(aTag => {
            if (aTag.href === window.location.href) {
                let classes = aTag.firstChild.classList.toString()
                let name = classes.replace('nav-icon', '');
                this.setState({
                    homeLink: name
                })
                aTag.firstChild.classList.add('active')
            }
        });
    }
       
    render() {
        return (
            <div>
                 <ul>
                    <a className="a-tag tooltip-navigation" href="/dashboard-agency"><li className="nav-icon dashboard"><FontAwesomeIcon icon={faHeadphones}/></li><span className="tooltiptextright">dashboard</span></a>
                    <a className="a-tag tooltip-navigation" href="/client-agency"><li className="nav-icon client"><FontAwesomeIcon icon={faHandshake}/></li><span className="tooltiptextright">client</span></a>
                    <a className="a-tag tooltip-navigation" href="/calendar-agency"><li className="nav-icon calendar"><FontAwesomeIcon icon={faCalendar}/></li><span className="tooltiptextright">calendar</span></a>
                    <a className="a-tag tooltip-navigation" href="/settings-agency"><li className="nav-icon settings"><FontAwesomeIcon icon={faWrench}/></li><span className="tooltiptextright">settings</span></a>
                </ul>
                <img src="/ease_black.svg" alt="ease logo"/>
            </div>
        )
    }
}

export default Navigation

// UPDATE NIET VANZELF