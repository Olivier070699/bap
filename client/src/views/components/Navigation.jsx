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
                    <a className="a-tag tooltip" href="/dashboard-agency"><li className="nav-icon dashboard"></li><span class="tooltiptext">dashboard</span></a>
                    <a className="a-tag tooltip" href="/artist-agency"><li className="nav-icon artist"></li><span class="tooltiptext">artist</span></a>
                    <a className="a-tag tooltip" href="/client-agency"><li className="nav-icon client"></li><span class="tooltiptext">client</span></a>
                    <a className="a-tag tooltip" href="/calendar-agency"><li className="nav-icon calendar"></li><span class="tooltiptext">calendar</span></a>
                    <a className="a-tag tooltip" href="/settings-agency"><li className="nav-icon settings"></li><span class="tooltiptext">settings</span></a>
                </ul>
            </div>
        )
    }
}

export default Navigation

// UPDATE NIET VANZELF