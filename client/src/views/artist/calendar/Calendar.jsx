import React, { Component } from 'react'
import firebase from '../../../config/firebase'
import Calendar from 'tui-calendar'
import "tui-calendar/dist/tui-calendar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import '../../../style/_hide-section.scss'

export class AddDate extends Component {

  state = {
    calendar: '',
    dates: [],
  }

  componentDidMount = () => {
    // LOAD CALENDAR
    var calendar = new Calendar('#calendar', {
      defaultView: 'month',
      taskView: false,
      // useCreationPopup: true,
      useDetailPopup: false,
      template: {
        monthDayname: function (dayname) {
          return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
        }
      }
    });
    
    this.setState({
      calendar,
    })
          this.showDate()
  }

    showDate = () => {
        let artist_key = localStorage.getItem('artist_key')
        firebase.database().ref('events').on('value', snapshot => {
            snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val();
                if (artist_key === data.artist && this.state.dates.includes(childSnapshot.key) === false) {
                    this.state.dates.push(childSnapshot.key)
                    let calendar = this.state.calendar
                    calendar.createSchedules([
                    {
                        id: `${childSnapshot.key}`,
                        calendarId: '1',
                        title: `${data.event}`,
                        category: 'time',
                        location: `${data.adres}`,
                        color: 'white',
                        bgColor: 'blue',
                        dueDateClass: '',
                        start: `${data.start}`,
                        end: `${data.stop}`
                    }
                    ])
                }
            });
        })
        }
    
    newDate = () => {
        document.querySelector('.form-new-date').classList.remove('hide')
        document.querySelector('.form-new-date').classList.add('new')
      }

    // FORM
    logChanges = (e) => {
    this.setState({
        [e.target.id]: e.target.value,
    })
    }

    submitForm = (e) => {
    e.preventDefault()
    let targetClasses = e.target.classList
    if (targetClasses.contains('new')) {
        e.target.classList.remove('new')
        this.saveDate()
    } else {
        e.target.classList.remove('update')
        this.updateEvent()
    }
    }

    saveDate = (e) => {
    firebase.database().ref(`events`).push({
        artist: localStorage.getItem('artist_key'),
        client: '',
        event: 'no bookings - ' + this.state.event,
        start: this.state.start,
        stop: this.state.stop,
        adres: '',
        street: '',
        number: '',
        city: '',
        country: '',
        agency_key: localStorage.getItem('agency_key'),
        payment_status: '',
        paydate: ''
    })
    console.log('save date')
    this.showDate()
    document.querySelector('#calendar form').reset()
    NotificationManager.success('New date is added succesfully.', 'Succeeded!');
    }

    // MOVE TO today/prev/next
    prev = (e) => {
    let calendar = this.state.calendar
    calendar.prev();
    }

    today = () => {
    let calendar = this.state.calendar
    calendar.today();
    }

    next = () => {
    let calendar = this.state.calendar
    calendar.next();
    }

    // TOGGLE BETWEEN CALENDAR VIEW
    changeView = (e) => {
    let calendar = this.state.calendar
    calendar.changeView(`${e.target.value}`, true);
    }

    close = () => {
    document.querySelector('.form-new-date').classList.add('hide')
    document.querySelector('#calendar form').reset()
    this.setState({
        artist: '',
        event: '',
        start: '',
        stop: '',
    })
    }
  render() {
    return (
      <div className="container-add-new-date">
          
        <div className="container-calendar-navigation">
          <select onChange={this.changeView}>
            <option value="month">month</option>
            <option value="week">week</option>
            <option value="day">day</option>
          </select>
          <button value="today" onClick={this.today}>today</button>
          <button onClick={this.newDate}>new</button>

          <div>
            <FontAwesomeIcon
                icon={faChevronLeft}
                className="navigation-component"
                onClick={this.prev}
            />
            <FontAwesomeIcon
                icon={faChevronRight}
                className="navigation-component"
                onClick={this.next}
            />
          </div>  
        </div>

        <div id="calendar">
          <form className="form-new-date hide" onSubmit={this.submitForm}>
          <FontAwesomeIcon
                icon={faTimesCircle}
                className="form-new-date-close"
                onClick={this.close}
            />
              <input id="event" onChange={this.logChanges} type="text" placeholder="event name" required/>
              <input id="start" onChange={this.logChanges} type="datetime-local" placeholder="start" required/>
              <input id="stop" onChange={this.logChanges} type="datetime-local" placeholder="stop" required/>
              <button className="btn-save-date">save</button>
            </form>
        </div>
        <NotificationContainer/>
      </div>
    )
  }
}

export default AddDate

// FORM ON SUBMIT
// UPDATE ARTIST NAME

// BIJ HET OPENEN UPDATE/NEW MEE GEVEN, ONSUBMIT VERWIJZEN NAAR DE JUISTE FUNCTIE OP HET EINDE UPDATE/NEW VERWIJDEREN