import React, { Component } from 'react'
import firebase from '../../../config/firebase'
import '../../../style/_general.scss'
import jsPDF from 'jspdf'

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
        eventID :''
    }
    
    componentDidMount = () => {
        this.loadAll()
    }

    loadAll = () => {
        let agencyKey = localStorage.getItem('agency_key')
        document.querySelector('.table-bill-content').innerHTML = '';
        document.querySelector('.table-bill-content').innerHTML = '<tr><th>Event</th><th>Date</th><th>Payment status</th><th></th><th></th></tr>'
        firebase.database().ref(`events`).on('value', snap => {
            snap.forEach(childsnap => {
                let data = childsnap.val()
                if (agencyKey === data.agency_key && data.payment_status !== "") {
                    firebase.database().ref(`artist/${data.artist}`).on('value', snapshot => {
                        let datum = data.start.substring( 0, data.start.indexOf( "T" ) );
                        let content = `<tr id="${childsnap.key}" class="content-client"><td class="event-name">${data.event} - ${snapshot.val().artist_name}</td><td>${datum}</td><td class="btn-payment_status">${data.payment_status}</td><td class="download-bill invite-artist">download invoice</td><td>send payment reminder</td></tr>`
                        document.querySelector('.table-bill-content').insertAdjacentHTML('beforeend', content)  
                    })
                }
            });
        })
        setTimeout(() => {
            this.renderEventListeners()
        }, 1500);
    }

    loadOpenPayments = () => {
        let agencyKey = localStorage.getItem('agency_key')
        document.querySelector('.table-bill-content').innerHTML = '';
        document.querySelector('.table-bill-content').innerHTML = '<tr><th class="filter-sort">Event</th><th class="filter-sort">Date</th><th>Payment status</th><th></th><th></th></tr>'
        firebase.database().ref(`events`).on('value', snap => {
            snap.forEach(childsnap => {
                let data = childsnap.val()
                if (agencyKey === data.agency_key  && data.payment_status !== "") {
                    firebase.database().ref(`artist/${data.artist}`).on('value', snapshot => {
                        if (data.payment_status === 'Open') {
                            let datum = data.start.substring(0, data.start.indexOf("T"));
                            let content = `<tr id="${childsnap.key}" class="content-client"><td class="event-name">${data.event} - ${snapshot.val().artist_name}</td><td>${datum}</td><td class="btn-payment_status">${data.payment_status}</td><td class="download-bill invite-artist">download invoice</td><td>send payment reminder</td></tr>`
                            document.querySelector('.table-bill-content').insertAdjacentHTML('beforeend', content)
                        }
                    })
                }
            });
        })
        setTimeout(() => {
            this.renderEventListeners()
        }, 1500);
    }

    renderEventListeners = () => {
        let downloadBillBtns = document.querySelectorAll('.download-bill')
        console.log(downloadBillBtns)
        downloadBillBtns.forEach(downloadBillBtn => {
        downloadBillBtn.addEventListener('click', this.getBillInfo)
        });
        
        let paymentStatusBtns = document.querySelectorAll('.btn-payment_status')
        paymentStatusBtns.forEach(paymentStatusBtn => {
            paymentStatusBtn.addEventListener('click', this.changePaymentStatus)
        });
    }

    getBillInfo = (e) => {
        console.log('active')
        let eventID = e.target.parentNode.id
        this.setState({
            eventID,
        })
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
            this.downloadPDF()
        })
    }

    downloadPDF = () => {
        let doc = new jsPDF('a4')
        // POSITION POSITION TEXT
        let totalPrice = this.state.artistPrice +  (this.state.bookingsfee/100*this.state.artistPrice)
        doc.setFontSize(16);
        doc.text(`event: ${this.state.eventName}`, 20, 30);
        doc.text(`artist: ${this.state.artistName}`, 20, 40);
        doc.text(`hours: ${this.state.start} - ${this.state.stop}`, 20, 50);
        doc.text(`adres: ${this.state.adres}`, 20, 60)

        doc.setFontSize(12);
        doc.text(`artistprice: €${this.state.artistPrice}`, 20, 70);
        doc.text(`bookingsfee: ${this.state.bookingsfee}%`, 20, 75);
        doc.setFontSize(16);
        doc.text(`to pay: €${totalPrice}`, 20, 80);

        doc.save(`${this.state.eventName} - ${this.state.artistName}`)
    
    }

    changePaymentStatus = (e) => {
        let value = e.target.innerHTML
        let eventID = e.target.parentNode.id
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        if (value === 'Open') {
            value = 'Paid'
            today = dd + '/' + mm + '/' + yyyy;
        } else if (value === 'Paid') {
            value = 'Open'
            today = ''
        }

        firebase.database().ref(`events/${eventID}`).update({
            payment_status: value,
            paydate: today,
        })

        this.loadAll()
    }

    search = (e) => {
        let value = e.target.value.toLowerCase()
        let names = document.querySelectorAll('.event-name')
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
        console.log(e.target.innerHTML)
        document.querySelector('.artist-filter-active').classList.remove('artist-filter-active')
        e.target.classList.add('artist-filter-active')

        if (e.target.innerHTML === 'All events') {
            this.loadAll()
        } else {
            this.loadOpenPayments()
        }
    }

    render() {
        return (
            <div>
                <div className="container-addNewArtist">                
                    <div className="container-addNewArtist-child">
                        <ul>
                            <li className="artist-filter-active" onClick={this.changeFilter}>All events</li>
                            <li onClick={this.changeFilter}>Open payments</li>
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
                        <div className="table-scrollable">
                            <table className="table-bill-content"></table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Form

// PAY DATE
// RENDER EVENT LISTENERS
// SET TIME OUT MOET WEG!!!

// PAYMENT STATUS BY SEARCH OF OPEN PAYMENTS  IS FOKT 