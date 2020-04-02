import React, { Component } from 'react'
import firebase from '../../../config/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import '../../../style/_general.scss'

export class AddNewArtist extends Component {
    
    componentDidMount = () => {
        let table = document.getElementById('table-content');
        table.innerHTML = ''
        table.insertAdjacentHTML('beforeend', '<tr><th class="filter-sort">Name</th><th class="filter-sort">Artistname</th><th>Date of Birth</th><th>Country</th><th></th></tr>')
        const raw = firebase.database().ref('artist');
        raw.on('value', (snapshot) => {
          snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val();
              if (data.agency_key === '') {
                firebase.database().ref(`user/${data.db_user_id}`).on('value', snap => {
                    const content = `<tr class="content-add-artist"><td class="name">${snap.val().name}</td><td class="artistname">${data.artist_name}</td><td>${data.date_of_birth}</td><td>${snap.val().country}</td><td class="invite-artist" id="${data.user_id}">invite artist</td></tr>`
                    table.insertAdjacentHTML('beforeend', content);
                })  
              }
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
    }

    search = (e) => {
        let value = e.target.value.toLowerCase()
        let names = document.querySelectorAll('.name')
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

    changeFilter = (e) => {
        document.querySelector('.artist-filter-active').classList.remove('artist-filter-active')
        e.target.classList.add('artist-filter-active')
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
                    <ul>
                        <li className="artist-filter-active" onClick={this.changeFilter}>All users</li>
                        <li onClick={this.changeFilter}>New users</li>
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
                        
                    </table>
                </div>
            </div>
        )
    }
}

export default AddNewArtist


// IF ARTIST IS INVITED REMOVE FROM LIST
// ZOEKEN OP NAAM & ARTIESTEN NAAM
// ZOEKEN OP NEW USER: user.metadata.creationTime.substring(5)