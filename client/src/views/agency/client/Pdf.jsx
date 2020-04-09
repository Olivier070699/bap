import React, { Component } from 'react'
import firebase from '../../../config/firebase'
import jsPDF from 'jspdf'

export class Pdf extends Component {
    
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    
    componentWillMount = () => {
        let url_string = window.location.href
        let url = new URL(url_string);
        let eventID = url.searchParams.get("e");

        let agencyID
        let artistID

        // EVENT DATA
        firebase.database().ref(`events/${eventID}`).on('value', snap => {
            let data = snap.val()
            artistID = data.artist
            agencyID = data.agency_key
            this.setState({
                eventName: data.event,
                adres: data.adres,
                start: data.start,
                stop: data.stop,
            })

            // AGENCY DATA
            firebase.database().ref(`agency/${agencyID}`).on('value', snap => {
                let data = snap.val()
                this.setState({
                    bookingsfee: Number(data.bookingsfee),
                    agencyName: data.agency_name,
                })
            })
    
            // ARTIST DATA
            firebase.database().ref(`artist/${artistID}`).on('value', snap => {
                let data = snap.val()
                this.setState({
                    artistPrice: Number(data.price),
                    artistName: data.artist_name,
                })
            })
            setTimeout(() => {
                this.createPDF()
            }, 150);
        })
    }

    createPDF = () => {
        let doc = new jsPDF('p', 'pt')
        // POSITION POSITION TEXT
        doc.text(20, 20, 'The text')
        doc.save('pdfName.pdf')
    }

    render() {
        return (
            <div>
                <p className="test"></p>
            </div>
        )
    }
}

export default Pdf
