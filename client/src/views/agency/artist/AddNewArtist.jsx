import React, { Component } from 'react'
import firebase from '../../../config/firebase'
import '../../../style/_general.scss'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export class AddNewArtist extends Component {
    
    componentDidMount = () => {
        firebase.database().ref('invite_artist').on('value', snap => {
            let keyArray = []
            snap.forEach(childSnap => {
                if (childSnap.val().agency_key === localStorage.getItem('agency_key')) {
                    keyArray.push(childSnap.val().artist_id)
                }
            });
            let table = document.getElementById('table-content');
            const raw = firebase.database().ref('artist');
                raw.on('value', (snapshot) => {
                console.log(keyArray)
                table.innerHTML = ''
                table.insertAdjacentHTML('beforeend', '<tr><th class="filter-sort">Name</th><th class="filter-sort">Artist name</th><th>Date of Birth</th><th>Country</th><th></th></tr>')
                snapshot.forEach((childSnapshot) => {
                    const data = childSnapshot.val();
                    if (data.agency_key === '' && keyArray.includes(data.user_id) === false) {
                        firebase.database().ref(`user/${data.db_user_id}`).on('value', snap => {
                            const content = `<tr class="content-add-artist"><td class="name">${snap.val().name}</td><td class="artistname">${data.artist_name}</td><td>${data.date_of_birth}</td><td>${snap.val().country}</td><td class="invite-artist" id="${data.user_id}">invite artist</td></tr>`
                            table.insertAdjacentHTML('beforeend', content);
                        })  
                    }
                });
            });
            this.addEventListeners()
        })
    }

    addEventListeners = () => {
        setTimeout(() => {
            let tds = document.querySelectorAll('.invite-artist')
            tds.forEach(td => {
                td.addEventListener('click', this.inviteArtist)
            });

            let sortTds = document.querySelectorAll('.filter-sort')
            sortTds.forEach(sortTd => {
                sortTd.addEventListener('click', this.sortAlphabetic)
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
        .then(() => {
            NotificationManager.success('Artist is successfully invited.', 'Succeeded!');
        })
    }

    search = (e) => {
        let value = e.target.value.toLowerCase()
        let names = document.querySelectorAll('.artistname')
        names.forEach(name => {
            let tr_namevalue = name.innerHTML.toLowerCase()
            if (!tr_namevalue.includes(value)) {
                // SEARCH
                name.parentNode.classList.add('hide')
            } else {
                name.parentNode.classList.remove('hide')
            }
        });
    }

    sortAlphabetic = (e) => {
        let table, rows, switching, i, x, y, shouldSwitch, columNumber

        if (e.target.innerHTML === 'Name') {
            columNumber = 0
        } else {
            columNumber = 1
        }

        table = document.getElementById("table-content");
        switching = true;

        while (switching) {
            switching = false;
            rows = table.rows;
            
            for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            
            x = rows[i].getElementsByTagName("TD")[columNumber];
            y = rows[i + 1].getElementsByTagName("TD")[columNumber];
            
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            }
        }
    }

    render() {
        return (
            <div className="container-addNewArtist hide">                
                <div className="container-addNewArtist-child">
                    <ul className="ul-add-artist">
                        <li>
                            <div className="container-search">
                                <input
                                    placeholder="search artist name"
                                    id="search-value"
                                    onChange={this.search}
                                />
                            </div>
                        </li>
                    </ul>
                    <div className="table-scrollable">
                        <table id="table-content">
                        
                        </table>
                    </div>
                </div>
                <NotificationContainer/>
            </div>
        )
    }
}

export default AddNewArtist
