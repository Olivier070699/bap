import React, { Component } from 'react'
import firebase from '../config/firebase'

export class PageNotFound extends Component {
    state = {
        url: ''
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            // console.log(user)
            if (!user) {
                this.setState({
                    url: '/login'
                })
            }else{
                let type
                firebase.database().ref('user').on('value', snap => {
                    snap.forEach(childSnap => {
                        if (childSnap.val().id === user.uid) {
                            type = childSnap.val().type
                            this.setState({
                                url: `/dashboard-${type}`,
                            })
                        }
                    });
                })
            }
        })
    }
    render() {
        return (
            <div>
                <div className="container-pageNotFound">
                    <div>
                        <h2>ease mate!</h2>
                        <p>The page you're looking for doesn't excist.</p>
                        <a href={this.state.url}>Go back</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default PageNotFound
