import React, { Component } from 'react'
import firebase from '../../config/firebase'
import PageTitle from './PageTitle'

export class Header extends Component {
    
    state = {
        email: '',
        name: '',
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            // console.log(user)
            if (!user) {
                window.location = '/login'
            }
            let email = user.email
            let name = user.displayName
            let uid = user.uid
            localStorage.setItem('uid', uid)
            this.setState({
                email,
                name,
            })
            document.querySelector('.claim').innerHTML = "Hello " + this.state.name

            // AGENCY ID
            firebase.database().ref('/agency').on('value', snap => {
                snap.forEach((childSnapshot) => {
                    const data = childSnapshot.val();
                    if (data.user_id === uid) {
                        localStorage.setItem('agency_id', data.id)
                        localStorage.setItem('agency_name', data.agency_name)
                        localStorage.setItem('agency_key', childSnapshot.key)
                    }
              });
            });
        });
    }
    
    render() {
        return (
            <div>
                <PageTitle/>
                <p className="claim"></p>
            </div>
        )
    }
}

export default Header
