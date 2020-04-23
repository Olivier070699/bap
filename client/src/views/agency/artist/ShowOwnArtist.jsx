import React, { Component } from 'react'
import '../../../style/_general.scss'
import firebase from '../../../config/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

export class ShowOwnArtist extends Component {
    
    componentDidMount = () => {
        let agencyKey = localStorage.getItem('agency_key')
        let artistContainer = document.querySelector('.container-showOwnArtist-child')
        firebase.database().ref('artist').on('value', snapshot => {
            artistContainer.innerHTML = ''
            snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val();
                if (agencyKey === data.agency_key) {
                    let bio = data.bio.replace(/^(.{140}[^\s]*).*/, "$1") + "\n";
                    let content = `<div id=${childSnapshot.key} class="container-artist"><div class="container-artist-image"><img src="${data.artist_image}"></div><div class="container-artist-text"><div class="container-artist-text-child"><h1>${data.artist_name}</h1><p class="artist-bioSnippet">${bio}...</p></div></div></div>`
                    artistContainer.insertAdjacentHTML('beforeend', content)
                }
            });
            this.renderEventListeners()
        })
    }

    renderEventListeners = () => {
        let artists = document.querySelectorAll('.container-artist')
        artists.forEach(artist => {
            artist.addEventListener('click', this.showArtistDetail)
        });
    }

    showArtistDetail = (e) => {
        let key = e.target.id
        firebase.database().ref(`artist/${key}`).on('value', snap => {
            document.querySelector('.container-artist-detail div').innerHTML = ''
            const data = snap.val()
            console.log(data)
            let content = `<h1>${data.artist_name}</h1><p>${data.bio}</p>`
            document.querySelector('.container-artist-detail div').insertAdjacentHTML('beforeend', content)
        })
        document.querySelector('.container-showOwnArtist-child').classList.add('blur')
        document.querySelector('.container-artist-detail').classList.remove('hide')
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

    close() {
        document.querySelector('.container-showOwnArtist-child').classList.remove('blur')
        document.querySelector('.container-artist-detail').classList.add('hide')
    }
    
    render() {
        return (
            <div className="container-showOwnArtist">
                <div className="container-showOwnArtist-child"></div>
                <div className="container-artist-detail hide">
                    <FontAwesomeIcon
                        icon={faTimesCircle}
                        onClick={this.close}
                    />
                    <div></div>
                </div>
            </div>
        )
    }
}

export default ShowOwnArtist
