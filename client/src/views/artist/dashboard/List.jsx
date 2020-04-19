import React, { Component } from 'react'
import firebase from '../../../config/firebase'

export class List extends Component {

    componentDidMount = () => {
        this.weekView()
    }

    monthView() {
        let today = new Date();
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = yyyy + '-' + mm;
        
        firebase.database().ref('events').on('value', snap => {
            document.querySelector('.table-bill-content').innerHTML = '';
            snap.forEach(childSnap => {
                const data = childSnap.val()
                let date = data.start.substring(0, 7)
                let date_show = data.start.substring(0, data.start.indexOf("T"));
                let start = data.start.substring(11, 16);
                let stop = data.stop.substring(11, 16);
                if (date === today && data.artist === localStorage.getItem('artist_key') && data.payment_status !== "") {
                    let content = `<tr class="content-client"><td class="event-name">${data.event}</td><td>${date_show}</td><td>${start} - ${stop}</td><td>${data.adres}</td></tr>`
                    document.querySelector('.table-bill-content').insertAdjacentHTML('beforeend', content)
                }
            });
            this.orderFormByDate()
        })
    }

    weekView() {
        let curr = new Date() 
        let week = []
        for (let i = 1; i <= 7; i++) {
            let first = curr.getDate() - curr.getDay() + i
            let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
            week.push(day)
        }
        firebase.database().ref('events').on('value', snap => {
            document.querySelector('.table-bill-content').innerHTML = '';
            snap.forEach(childSnap => {
                const data = childSnap.val()
                let date = data.start.substring(0, data.start.indexOf("T"));
                let start = data.start.substring(11, 16);
                let stop = data.stop.substring(11, 16);
                if (week.includes(date) && data.artist === localStorage.getItem('artist_key') && data.payment_status !== "") {
                    let content = `<tr class="content-client"><td class="event-name">${data.event}</td><td>${date}</td><td>${start} - ${stop}</td><td>${data.adres}</td></tr>`
                    document.querySelector('.table-bill-content').insertAdjacentHTML('beforeend', content)
                }
            });
            this.orderFormByDate()
        })
    }

    orderFormByDate(e) {
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

    selectView = (e) => {
        let value = e.target.innerHTML
        document.querySelector('.artist-filter-active').classList.remove('artist-filter-active')
        e.target.classList.add('artist-filter-active')
        if (value.includes('week')) {
            this.weekView()
        } else {
            this.monthView()
        }
    }

    render() {
        return (
            <div>
                <div className="container-addNewArtist">                
                    <div className="container-addNewArtist-child">
                        <ul>
                            <li className="artist-filter-active" onClick={this.selectView}>Shows this week</li>
                            <li onClick={this.selectView}>Shows this month</li>
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

export default List
