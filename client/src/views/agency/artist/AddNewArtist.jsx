import React, { Component } from 'react'
import firebase from '../../../config/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import '../../../style/_general.scss'

export class AddNewArtist extends Component {
    
    componentDidMount = () => {
        let table = document.getElementById('table-content');
        const raw = firebase.database().ref('artist');
        raw.on('value', (snapshot) => {
          snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val();
                const content = `<tr class="content-add-artist"><td class="name">Olivier Decock</td><td class="artistname">${data.artist_name}</td><td>${data.date_of_birth}</td><td>Belgium</td><td class="invite-artist" id="${data.user_id}">invite artist</td></tr>`
                table.insertAdjacentHTML('beforeend', content);
          });
        });
        this.addEventListeners()
    }

    addEventListeners = () => {
        setTimeout(() => {
            let tds = document.querySelectorAll('.invite-artist')
            tds.forEach(td => {
                td.addEventListener('click', this.inviteArtist)
            });
        }, 1500);
    }

    inviteArtist = (e) => {
        let artistID = e.target.id
        let agencyID = localStorage.getItem('agency_id')
        let agencyName = localStorage.getItem('agency_name')
        let agencyKey = localStorage.getItem('agency_key')

        firebase.database().ref('invite_artist').push({
            artist_id: artistID,
            agency_id: agencyID,
            agency_name: agencyName,
            agency_key: agencyKey,
        })
    }
    
    closeNewArtist = () => {
        document.querySelector('.container-addNewArtist').classList.add('hide')
        document.querySelector('.tooltip-add-artist').classList.remove('hide')
        document.querySelector('.container-showOwnArtist').classList.remove('hide')
    }

    search = (e) => {
        let value = e.target.value
        let names = document.querySelectorAll('.name')
        names.forEach(name => {
            let tr_namevalue = name.innerHTML
            if (!tr_namevalue.includes(value)) {
                // SEARCH
            }
        });
    }

    render() {
        return (
            <div className="container-addNewArtist hide">                
                <div className="container-addNewArtist-child">
                    <ul>
                        <li>All users</li>
                        <li>New users</li>
                        <li>
                            <div className="container-search">
                                <input
                                    placeholder="search"
                                    id="search-value"
                                    onChange={this.search}
                                />
                            </div>
                        </li>
                    </ul>

                    <table id="table-content">
                        <tr>
                            <th>Name</th>
                            <th>Artistname</th>
                            <th>Date of Birth</th>
                            <th>Country</th>
                            <th></th>
                        </tr>
                    </table>
                </div>
                
                <div className="tooltip-add-artist">
                    <span className="tooltiptext-left">close</span>
                    <FontAwesomeIcon
                        icon={faTimesCircle}
                        className="icon-close"
                        onClick={this.closeNewArtist}
                    />
                </div>
            </div>
        )
    }
}

export default AddNewArtist

// ALFABETISCH ORDENEN
// CLEAR TABLE
// IF ARTIST IS INVITED REMOVE FROM LIST