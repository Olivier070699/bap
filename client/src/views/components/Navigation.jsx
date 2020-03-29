import React, { Component } from 'react'


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
                    <a className="a-tag tooltip-navigation" href="/dashboard-agency"><li className="nav-icon dashboard"></li><span class="tooltiptextright">dashboard</span></a>
                    <a className="a-tag tooltip-navigation" href="/artist-agency"><li className="nav-icon artist"></li><span class="tooltiptextright">artist</span></a>
                    <a className="a-tag tooltip-navigation" href="/client-agency"><li className="nav-icon client"></li><span class="tooltiptextright">client</span></a>
                    <a className="a-tag tooltip-navigation" href="/calendar-agency"><li className="nav-icon calendar"></li><span class="tooltiptextright">calendar</span></a>
                    <a className="a-tag tooltip-navigation" href="/settings-agency"><li className="nav-icon settings"></li><span class="tooltiptextright">settings</span></a>
                </ul>
            </div>
        )
    }
}

export default Navigation

// UPDATE NIET VANZELF