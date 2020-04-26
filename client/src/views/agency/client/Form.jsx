import React, { Component } from 'react'
import firebase from '../../../config/firebase'
import '../../../style/_general.scss'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import axios from 'axios'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


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
        eventID: '',
        number: 0,
    }
    
    componentDidMount = () => {
            let agencyKey = localStorage.getItem('agency_key')
            firebase.database().ref(`events`).on('value', snap => {
                document.querySelector('.table-bill-content').innerHTML = '';
                document.querySelector('.table-bill-content').innerHTML = '<tr><th>Event</th><th>Date</th><th>Payment status</th><th></th><th></th></tr>'
                snap.forEach(childsnap => {
                    let data = childsnap.val()
                    if (agencyKey === data.agency_key && data.payment_status !== "") {
                        let datum = data.start.substring(0, data.start.indexOf("T"));
                        let paymentReminder = `<td></td>`
                        if (data.payment_status === 'Open') {
                            paymentReminder = `<td class="send-reminder invite-artist">send payment reminder</td>`
                        }
                        let content = `<tr id="${childsnap.key}" class="content-client"><td class="event-name">${data.event}</td><td>${datum}</td><td class="btn-payment_status">${data.payment_status}</td><td class="download-bill invite-artist">download invoice</td>${paymentReminder}</tr>`
                        document.querySelector('.table-bill-content').insertAdjacentHTML('beforeend', content)  
                    }
                });
                this.renderEventListeners()
                this.orderFormByDate()
            })
    }

    loadOpenPayments = () => {
        let agencyKey = localStorage.getItem('agency_key')
        firebase.database().ref(`events`).on('value', snap => {
            document.querySelector('.table-bill-content').innerHTML = '';
            document.querySelector('.table-bill-content').innerHTML = '<tr><th class="filter-sort">Event</th><th class="filter-sort">Date</th><th>Payment status</th><th></th><th></th></tr>'
            snap.forEach(childsnap => {
                let data = childsnap.val()
                if (agencyKey === data.agency_key  && data.payment_status !== "" && data.payment_status === 'Open') {
                    let datum = data.start.substring(0, data.start.indexOf("T"));
                    let content = `<tr id="${childsnap.key}" class="content-client"><td class="event-name">${data.event}</td><td>${datum}</td><td class="btn-payment_status">${data.payment_status}</td><td class="download-bill invite-artist">download invoice</td><td class="send-reminder">send payment reminder</td></tr>`
                    document.querySelector('.table-bill-content').insertAdjacentHTML('beforeend', content)
                }
            })
            this.renderEventListeners()
            this.orderFormByDate()
        })
    }

    orderFormByDate() {
        console.log(document.querySelectorAll('.content-client'))
        let table, rows, switching, i, x, y, shouldSwitch
        let columNumber = 1

        table = document.querySelector(".table-bill-content");
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

    renderEventListeners = () => {
        let paymentStatusBtns = document.querySelectorAll('.btn-payment_status')
        paymentStatusBtns.forEach(paymentStatusBtn => {
            paymentStatusBtn.addEventListener('click', this.changePaymentStatus)
        });

        let downloadBillBtns = document.querySelectorAll('.download-bill')
        downloadBillBtns.forEach(downloadBillBtn => {
        downloadBillBtn.addEventListener('click', this.getBillInfo)
        });

        let sendReminderBtns = document.querySelectorAll('.send-reminder')
        sendReminderBtns.forEach(sendReminderBtn => {
            sendReminderBtn.addEventListener('click', this.sendReminderMail)
        });
    }

    changePaymentStatus = (e) => {
        this.setState({
            number: 1
        })
        let downloadBillBtns = document.querySelectorAll('.download-bill')
        downloadBillBtns.forEach(downloadBillBtn => {
        downloadBillBtn.removeEventListener('click', this.getBillInfo)
        });

        let sendReminderBtns = document.querySelectorAll('.send-reminder')
        sendReminderBtns.forEach(sendReminderBtn => {
            sendReminderBtn.removeEventListener('click', this.sendReminderMail)
        });

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
        this.setState({
            number: 0
        })
    }

    getBillInfo = (e) => {
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
            // AGENCY DATA
            firebase.database().ref(`agency/${agencyID}`).on('value', snap => {
                let data = snap.val()
                this.setState({
                    bookingsfee: Number(data.bookingsfee),
                    agencyName: data.agency_name,
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
            })
        })
    }

    downloadPDF = () => {
        if (this.state.number === 0) {
            let doc = new jsPDF('a4')
            let totalPrice = this.state.artistPrice + (this.state.bookingsfee / 100 * this.state.artistPrice)
            console.log(this.state.artistPrice, this.state.bookingsfee, this.state.artistPrice, this.state.agencyName)

            doc.autoTable({
                columnStyles: { 0: { halign: 'center', } }, // Cells in first column centered and green
                margin: { top: 10 },
                body: [
                    ['Event:', this.state.eventName],
                    ['Adress:', this.state.adres],
                    ['', ''],
                    ['Artist:', this.state.artistName],
                    ['Start of the set:', this.state.start],
                    ['End of the set:', this.state.start],
                    ['', ''],
                    ['Price artist', this.state.artistPrice],
                    ['Booking fee', `${this.state.bookingsfee}%`],
                    ['Total price', totalPrice],
                ],
            })
            doc.save(`${this.state.eventName} - ${this.state.artistName}`)
        }
    }

    sendReminderMail = (e) => {
        if (this.state.number === 0) {
            let receiver, subject, body, bookingfee, accountnumber
            firebase.database().ref(`events/${e.target.parentNode.id}`).on('value', snap => {
                const event = snap.val()

                firebase.database().ref(`agency/${event.agency_key}`).on('value', snapShot => {
                    bookingfee = snapShot.val().bookingsfee
                    accountnumber = snapShot.val().account_number
                })
    
                firebase.database().ref(`artist/${event.artist}`).on('value', snapshot => {
                    const artist = snapshot.val()
                    let date = event.start.substring(0, event.start.indexOf("T"));
                    let price = Number(artist.price) + ((Number(artist.price)/100)*Number(bookingfee))

                    receiver = event.client_email
                    subject = `${event.event} - ${artist.artist_name}`
                    body = `Hi. We've noticed that you didn't pay your invoice from ${date}. Please transfer the outstandig amount of €${price} to ${accountnumber}.`
                    this.setState({
                        receiver,
                        subject,
                        body
                    })
                    console.log(receiver, subject, body)
                    this.sendMail()
                })
            })
        }
    }

    sendMail = () => {
        if (this.state.number === 0) {
            console.log(this.state.receiver, this.state.subject, this.state.body)
            const instance = axios.create({
                headers: {
                    "Content-Type": "application/json",
                }
            })
            instance.post('http://od.mediabelgium.be/home/sendmail', {
                Receiver: this.state.receiver,
                Subject: this.state.subject,
                Body: this.state.body
            })
                .then(function (response) {
                    NotificationManager.success('Sended reminder succesfully.', 'Succeeded!');
                })
                .catch(function (error) {
                    console.log(error);
                    console.log(error.response.status)
                });
        }
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
            this.componentDidMount()
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
                <NotificationContainer />
            </div>
        )
    }
}

export default Form
