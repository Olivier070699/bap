import React, { Component } from 'react'
import '../../style/components/_preloader.scss'

export class Preloader extends Component {
    
    componentDidMount = () => {
        setTimeout(() => {
            // document.querySelector('.container-load').classList.add('hide')
        }, 2000);
    }
    
    render() {
        return (
            <div class="container-load fade-out">
                <div class="load">
                    <hr/><hr/><hr/><hr/>
                </div>
            </div>
        )
    }
}

export default Preloader
