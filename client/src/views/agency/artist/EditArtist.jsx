import React, { Component } from 'react'
import '../../../style/_general.scss'
import firebase from '../../../config/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle  } from '@fortawesome/free-solid-svg-icons'

export class EditArtist extends Component {

    componentDidMount = () => {
        let url_string = window.location.href
        let url = new URL(url_string);
        let artistKey = url.searchParams.get("key");
        
        if (artistKey) {
            this.setState({
                artistKey: artistKey,
            })

            firebase.database().ref(`artist/${artistKey}`).on('value', snap => {
                let data = snap.val()
                document.getElementById('artist_name').value = data.artist_name
                document.getElementById('bio').value = data.bio
                document.getElementById('price').value = data.price
            })
        }
    }

    logPictureChanges = (e) => {
        let key = this.state.artistKey
        const fileName = e.target.files[0].name.replace(/\s+/g, '-').toLowerCase();
        const storageRef = firebase.storage().ref(`images/${key}/${fileName}`);
        
        storageRef.put(e.target.files[0]).then(() => {
            let imagePath = `images/${key}/${fileName}`;
            const storeImage = firebase.storage().ref(imagePath);
            storeImage.getDownloadURL().then((url) => {
                firebase.database().ref(`artist/${key}`).update({
                    artist_image: url,
                })
            });
        });
    }

    updateArtist = (e) => {
        e.preventDefault()
        let key = this.state.artistKey
        let artist_name = document.getElementById('artist_name').value
        let bio = document.getElementById('bio').value
        let price = document.getElementById('price').value
        
        firebase.database().ref(`artist/${key}`).update({
            artist_name,
            price,
            bio,
        })
        document.querySelector('.container-edit-artist-child form').reset()
        window.history.replaceState(null, null, `/artist-agency`);
    }

    close() {
        document.querySelector('.tooltip-add-artist').classList.remove('hide')
        document.querySelector('.container-showOwnArtist').classList.remove('hide')
        document.querySelector('.container-edit-artist').classList.add('hide')
        window.history.replaceState(null, null, `/artist-agency`);
    }

    render() {
        return (
            <div className="container-edit-artist hide">
                <div className="container-edit-artist-child">
                    <form>
                        <div className="form-edit-artist-child">
                            <div className="container-edit-artist-left">
                                <input id="artist_name" type="text" placeholder="artistname"/>
                                <textarea id="bio" placeholder="bio"></textarea>
                                <input id="price" type="number" placeholder="price"/>
                            </div>
                            <div className="container-edit-artist-right">
                                <input type="file" id="artist_image" onChange={this.logPictureChanges}/>
                                <p>drop image here</p>
                            </div>
                        </div>
                        <button onClick={this.updateArtist}>save</button>
                    </form>
                </div>
                <div className="tooltip-add-artist">
                    <span className="tooltiptext-left">close</span>
                    <FontAwesomeIcon
                        icon={faTimesCircle}
                        className="icon-add"
                        onClick={this.close}
                    />
                </div>
            </div>
        )
    }
}

export default EditArtist
