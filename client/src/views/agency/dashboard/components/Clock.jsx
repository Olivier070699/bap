import React, { Component } from 'react'

export class Clock extends Component {

    componentDidMount = () => {
        this.loadClock()
    }

    loadClock = () => {
        let today = new Date();
        let hours = ('0'+ today.getHours()).slice(-2);
        let minutes = ('0'+ today.getMinutes()).slice(-2);
        let seconds = ('0'+ today.getSeconds()).slice(-2);
        let time = hours + ":" + minutes + ":" + seconds;
        document.querySelector('.container-clock').innerHTML = time

        setTimeout(() => {
            this.loadClock()
        }, 1000);
    }

    render() {
        return (
            <div className="container-clock">
                
            </div>
        )
    }
}

export default Clock
