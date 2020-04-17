import React, { Component } from 'react'

export class PageTitle extends Component {
    
    state = {
        name: ''
    }

    componentDidMount() {
        let location = window.location.pathname.replace('-agency', '')
        location = location.replace('-artist', '')
        let name = location.replace('/', '')
        this.setState({
            name: name
        })
    }
    
    render() {
        return (
            <h2>{this.state.name}</h2>
        )
    }
}

export default PageTitle
