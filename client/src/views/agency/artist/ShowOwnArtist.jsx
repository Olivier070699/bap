import React, { Component } from 'react'
import '../../../style/_general.scss'
import firebase from '../../../config/firebase'

export class ShowOwnArtist extends Component {
    
    componentDidMount = () => {
        let agencyKey = localStorage.getItem('agency_key')
        let artistContainer = document.querySelector('.container-showOwnArtist-child')
        artistContainer.innerHTML = ''
        firebase.database().ref('artist').on('value', snapshot => {
            snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val();
                if (agencyKey === data.agency_key) {
                    let bio = data.bio.replace(/^(.{100}[^\s]*).*/, "$1") + "\n";
                    let content = `<div class="container-artist"><div class="container-artist-image"><img src="${data.artist_image}"></div><div class="container-artist-text"><div class="container-artist-text-child"><h1>${data.artist_name}</h1><p class="artist-bioSnippet">${bio}...</p><p class="artist-amountOfShows"><span>27</span> show this month</p></div></div></div>`
                    artistContainer.insertAdjacentHTML('beforeend', content)
                }
          });
        })
    }

    editArtist = (e) => {
        e.preventDefault()
        let artist_key = e.target.id
        window.history.replaceState(null, null, `/artist-agency?key=${artist_key}`);
        document.querySelector('.container-addNewArtist').classList.add('hide')
        document.querySelector('.container-action-btns').classList.add('hide')
        document.querySelector('.container-showOwnArtist').classList.add('hide')
        document.querySelector('.container-edit-artist').classList.remove('hide')
    }
    
    render() {
        return (
            <div className="container-showOwnArtist">
                <div className="container-showOwnArtist-child">
                    <div className="container-artist">
                        <div className="container-artist-image"></div>
                        <div className="container-artist-text">
                            <div className="container-artist-text-child">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ShowOwnArtist
