import React, { Component } from 'react'
import firebase from '../../../config/firebase'

export class AddDate extends Component {

    componentDidMount = () => {
        let agencyKey = localStorage.getItem('agency_key')
        firebase.database().ref('artist').on('value', snapshot => {
            snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val();
                if (agencyKey === data.agency_key) {
                    let option = `<option value="${childSnapshot.key}">${data.artist_name}</option>`
                    document.getElementById('artist').insertAdjacentHTML('beforeend', option)
                }
          });
        })
    }
    
    logChanges = (e) => {
        let id = e.target.id
        this.setState({
            [id]: e.target.value
        })
        console.log(`${id}: ${e.target.value}`)
    }

    submitData = (e) => {
        e.preventDefault()
        let adres = `${this.state.street} ${this.state.number}, ${this.state.city} ${this.state.country}`
        firebase.database().ref(`/events/${this.state.artist}`).push({
            artist: this.state.artist,
            event: this.state.event,
            start: this.state.start,
            stop: this.state.stop,
            adres: adres,
        })

        setTimeout(() => {
            document.querySelector('.container-add-new-date form').reset() 
        }, 1000);
    }

    render() {
        return (
            <div className="container-add-new-date hide">
                <form onSubmit={this.submitData}>
                    <select id="artist" onChange={this.logChanges} required>
                        <option disabled selected value> -- select an artist -- </option>
                    </select>
                    <input id="event" onChange={this.logChanges} type="text" placeholder="event name" required/>
                    <input id="start" onChange={this.logChanges} type="datetime-local" placeholder="start" required/>
                    <input id="stop" onChange={this.logChanges} type="datetime-local" placeholder="stop" required/>
                    <div>
                        <input id="street" onChange={this.logChanges} type="text" placeholder="street" required/>
                        <input id="number" onChange={this.logChanges} type="number" placeholder="number" required/>
                        <input id="city" onChange={this.logChanges} type="text" placeholder="city" required/>
                        <input id="country" onChange={this.logChanges} type="text" placeholder="country" required/>
                    </div>
                    <button>save</button>
                </form>
            </div>
        )
    }
}

export default AddDate

// CHECK IF STOP IS LATER THEN START
// CHECK ALS DAt UUR NOG VRIJ IS