import React, { Component } from 'react'
import '../../../style/_general.scss'
import firebase from '../../../config/firebase'

export class EditArtist extends Component {

    componentDidMount = () => {
        let artistKey = localStorage.getItem('editArtistKey')
        console.log('artist key: ' + artistKey)
    }

    logChanges = (e) => {
        let id = e.target.id
        this.setState({
            [id]: e.target.value
        })
    }

    updateArtist = (e) => {
        e.preventDefault()
        firebase.database().ref(`/artist/${this.state.artistKey}`).update({
            artist_name: this.state.artist_name,
            bio: this.state.bio,
            price: this.state.price,
        })
    }

    render() {
        return (
            <div className="container-edit-artist hide">
                <div className="container-edit-artist-child">
                    <form>
                        <div className="container-edit-artist-left">
                            <input id="artist_name" type="text" placeholder="artistname" onChange={this.logChanges}/>
                            <textarea id="bio" placeholder="bio" onChange={this.logChanges}></textarea>
                            <input id="price" type="number" placeholder="price" onChange={this.logChanges}/>
                        </div>
                        <div className="container-edit-artist-right">
                            <div>
                                drop image
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
