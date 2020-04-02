import React, { Component } from 'react'
import '../../../style/_general.scss'
import firebase from '../../../config/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle  } from '@fortawesome/free-solid-svg-icons'

export class EditArtist extends Component {

    state = {
        artistKey: ''
    }
    
    componentDidMount = () => {
        let agencyKey = localStorage.getItem('agency_key')
        firebase.database().ref('artist').on('value', snapshot => {
            snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val();
                if (agencyKey === data.agency_key) {
                    let option = `<option value="${childSnapshot.key}">${data.artist_name}</option>`
                    document.getElementById('artist_name').insertAdjacentHTML('beforeend', option)
                }
          });
        })
    }

    logArtistChange = (e) => {
        this.setState({
            artistKey: e.target.value
        })
        this.showArtistInfo()
    }

    showArtistInfo = () => {
        let artistKey = this.state.artistKey
        console.log(`key ${artistKey}`)
        firebase.database().ref(`artist/${artistKey}`).on('value', snapshot => {
            snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val();
                console.log(data)
                document.getElementById('bio').value = data.bio
                document.getElementById('price').value = data.price
          });
        })
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
        let bio = document.getElementById('bio').value
        let price = document.getElementById('price').value
        
        firebase.database().ref(`artist/${key}`).update({
            price,
            bio,
        })
        document.querySelector('.container-edit-artist-child form').reset()
    }

    render() {
        return (
            <div className="container-edit-artist hide">
                <div className="container-edit-artist-child">
                    <form>
                        <div className="form-edit-artist-child">
                            <div className="container-edit-artist-left">
                                <select id="artist_name" onChange={this.logArtistChange}><option disabled selected value> -- select an artist -- </option></select>
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
            </div>
        )
    }
}

export default EditArtist

// STATE IS TO SLOW
