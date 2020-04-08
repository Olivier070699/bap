import React, { Component } from 'react'
import firebase from '../../../config/firebase'
import '../../../style/_general.scss'

export class Form extends Component {
    
    state = {
        eventName: '',
        adres: '',
        start: '',
        stop: '',
        bookingsfee: '',
        agencyName: '',
        artistPrice: '',
        artistName: '',
    }
    
    componentDidMount = () => {
        document.querySelector('.table-bill-content').innerHTML = '';
        document.querySelector('.table-bill-content').innerHTML = '<tr><th class="filter-sort">Event</th><th class="filter-sort">Date</th><th>Payment status</th><th></th><th></th></tr>'
        firebase.database().ref(`events`).on('value', snap => {
            snap.forEach(childsnap => {
                let data = childsnap.val()
                let content = `<tr class="content-client"><td>${data.event} - artist</td><td>${data.start}</td><td>open/payed</td><td id="${childsnap.key}" class="download-bill">download bill</td><td>send payment reminder</td></tr>`
                document.querySelector('.table-bill-content').insertAdjacentHTML('beforeend', content)
            });
        })
        this.renderEventListeners()
    }

    renderEventListeners = () => {
        setTimeout(() => {
            let DownloadBillBtns = document.querySelectorAll('.download-bill')
            DownloadBillBtns.forEach(DownloadBillBtn => {
            DownloadBillBtn.addEventListener('click', this.getBillInfo)
        });
        }, 1500);
    }

    getBillInfo = (e) => {
        let eventID = e.target.id
        let agencyID = localStorage.getItem('agency_key')
        let artistID

        // EVENT DATA
        firebase.database().ref(`events/${eventID}`).on('value', snap => {
            let data = snap.val()
            artistID = data.artist
            this.setState({
                eventName: data.event,
                adres: data.adres,
                start: data.start,
                stop: data.stop,
            })
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
        this.downloadPDF()
    }

    downloadPDF = () => {
       setTimeout(() => {
        console.log(this.state)
       }, 1000);
    }
    render() {
        return (
            <div>
                <div className="container-addNewArtist">                
                <div className="container-addNewArtist-child">
                    <ul>
                        <li className="artist-filter-active" onClick={this.changeFilter}>All users</li>
                        <li onClick={this.changeFilter}>New users</li>
                        <li>
                            <div className="container-search">
                                <input
                                    placeholder="search client"
                                    id="search-value"
                                    onChange={this.search}
                                />
                            </div>
                        </li>
                    </ul>

                    <table className="table-bill-content">
                    </table>
                </div>
            </div>
            </div>
        )
    }
}

export default Form
