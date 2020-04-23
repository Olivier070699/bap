import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWrench, faCalendar, faThList } from '@fortawesome/free-solid-svg-icons'


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

    com
       
    render() {
        return (
            <div>
                 <ul>
                    <a className="a-tag tooltip-navigation" href="/dashboard-artist"><li className="nav-icon dashboard"><FontAwesomeIcon icon={faThList}/></li><span class="tooltiptextright">dashboard</span></a>
                    <a className="a-tag tooltip-navigation" href="/calendar-artist"><li className="nav-icon calendar"><FontAwesomeIcon icon={faCalendar}/></li><span class="tooltiptextright">calendar</span></a>
                    <a className="a-tag tooltip-navigation" href="/settings-artist"><li className="nav-icon settings"><FontAwesomeIcon icon={faWrench}/></li><span class="tooltiptextright">settings</span></a>
                </ul>
            </div>
        )
    }
}

export default Navigation

// UPDATE NIET VANZELF