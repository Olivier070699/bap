import React, { Component } from 'react'
import '../../../style/_general.scss'
import firebase from '../../../config/firebase'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


export class EditArtist extends Component {

    state = {
        artistKey: '', 
    }
    
    componentDidMount = () => {
        let agencyKey = localStorage.getItem('agency_key')
        firebase.database().ref('artist').on('value', snapshot => {
            document.getElementById('artist_name').innerHTML = ''
            document.getElementById('artist_name').insertAdjacentHTML('beforeend', '<option disabled selected value> -- select an artist -- </option>')
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
        setTimeout(() => {
            this.showArtistInfo()
        }, 5);
    }

    showArtistInfo = () => {
        let artistKey = this.state.artistKey
        console.log(`key ${artistKey}`)
        firebase.database().ref(`artist/${artistKey}`).on('value', snapshot => {
            let data = snapshot.val()
            document.getElementById('bio').value = data.bio
            document.getElementById('price').value = data.price
            if (data.color) {
                document.getElementById('color').value = data.color
            }
        })
    }

    logPictureChanges = (e) => {
        let key = this.state.artistKey
        const fileName = e.target.files[0].name.replace(/\s+/g, '-').toLowerCase();
        const storageRef = firebase.storage().ref(`images/${key}/${fileName}`);
        
        document.querySelector('.imageName').innerHTML = `${fileName}`

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
        let color = document.getElementById('color').value
        
        firebase.database().ref(`artist/${key}`).update({
            price,
            bio,
            color
        })
        .then(() => { 
            this.setState({
                artistKey: ''
            })
            NotificationManager.success('Update is successfully done.', 'Succeeded!');
            document.querySelector('.container-edit-artist-child form').reset()
        })
        .catch((e) => {
            NotificationManager.error(e.message, 'Error!');
        })
    }

    render() {
        return (
            <div className="container-edit-artist hide">
                <div className="container-edit-artist-child">
                    <form>
                        <div className="form-edit-artist-child">
                            <div className="container-edit-artist-left">
                                <select id="artist_name" onChange={this.logArtistChange}></select>
                                <textarea id="bio" placeholder="bio"></textarea>
                                <input id="price" type="number" placeholder="price" />
                                <input id="color" type="color" placeholder="color"/>
                            </div>
                            <div className="container-edit-artist-right">
                                <input type="file" id="artist_image" onChange={this.logPictureChanges}/>
                                <div>
                                    <p>select image here</p>
                                    <p className="imageName"></p> 
                                </div>
                                
                            </div>
                        </div>
                        <button onClick={this.updateArtist}>save</button>
                    </form>
                </div>
                <NotificationContainer/>
            </div>
        )
    }
}

export default EditArtist

// STATE IS TO SLOW
// NotificationManager.info('Info message');
// NotificationManager.success('Success message', 'Title here');
// NotificationManager.error('Success message', 'Title here');

// ALS ER GESELECTEERD WORDT DE VALUES INLADEN