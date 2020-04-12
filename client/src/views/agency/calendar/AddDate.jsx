import React, { Component } from 'react'
import firebase from '../../../config/firebase'
import Calendar from 'tui-calendar'
import "tui-calendar/dist/tui-calendar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

export class AddDate extends Component {

  state = {
    calendar: '',
    dates: [],
  }

  componentDidMount = () => {
    // LOAD CALENDAR
    var calendar = new Calendar('#calendar', {
      defaultView: 'month',
      taskView: true,
      // useCreationPopup: true,
      useDetailPopup: true,
      template: {
        monthDayname: function (dayname) {
          return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
        }
      }
    });
    
    this.setState({
      calendar,
      test: 0,
    })

    // CLICK EVENTS
    calendar.on({
      'beforeUpdateSchedule': function (e) {
        let event_to_update = e.schedule.id
        localStorage.setItem('event_to_update', event_to_update)

        document.querySelector('.btn-save-date').classList.add('hide')
        document.querySelector('.btn-update-date').classList.remove('hide')

        firebase.database().ref(`events/${e.schedule.id}`).on('value', snapshot => {
          let data = snapshot.val()
          document.getElementById('event').value = data.event
          document.getElementById('start').value = data.start
          document.getElementById('stop').value = data.stop
          document.getElementById('street').value = data.street
          document.getElementById('number').value = data.number
          document.getElementById('city').value = data.city
          document.getElementById('country').value = data.country
        })
        document.querySelector('.form-new-date').classList.remove('hide')
      },
      'beforeDeleteSchedule': function(e) {
          firebase.database().ref(`events/${e.schedule.id}`).remove()
          calendar.deleteSchedule(e.schedule.id, e.schedule.calendarId);
      }
    });

    // LOAD ARTIST FORM SELECT
    let agencyKey = localStorage.getItem('agency_key')
    document.getElementById('artist').innerHTML = ''
    document.getElementById('artist').innerHTML = '<option disabled selected value> -- select an artist -- </option>'
      firebase.database().ref('artist').on('value', snapshot => {
        snapshot.forEach((childSnapshot) => {
          const data = childSnapshot.val();
          if (agencyKey === data.agency_key) {
              let option = `<option value="${childSnapshot.key}">${data.artist_name}</option>`
              document.getElementById('artist').insertAdjacentHTML('beforeend', option)
          }
        });
        console.log('componentdidmount')
          this.showDate()
      })
  }

  showDate = () => {
    console.log('showdate')
    firebase.database().ref('events').on('value', snapshot => {
      snapshot.forEach((childSnapshot) => {
        if(this.state.dates.includes(childSnapshot.key) === false) {
          this.state.dates.push(childSnapshot.key)
          const data = childSnapshot.val();
          let calendar = this.state.calendar
          firebase.database().ref(`artist/${data.artist}`).on('value', snap => {
            calendar.createSchedules([
              {
                id: `${childSnapshot.key}`,
                calendarId: '1',
                title: `${snap.val().artist_name} - ${data.event}`,
                category: 'time',
                location: `${data.adres}`,
                color: 'white',
                bgColor: 'blue',
                dueDateClass: '',
                start: `${data.start}`,
                end: `${data.stop}`
              }
            ])
          })
        }
      });
    })
  }

  // FORM
  logChanges = (e) => {
    this.setState({
        [e.target.id]: e.target.value,
    })
  }

  saveDate = (e) => {
    e.preventDefault()
    let agency_key = localStorage.getItem('agency_key')
    let adres = `${this.state.street} ${this.state.number}, ${this.state.city} ${this.state.country}`
    firebase.database().ref(`events`).push({
      artist: this.state.artist,
      client: '',
      event: this.state.event,
      start: this.state.start,
      stop: this.state.stop,
      adres: adres,
      street: this.state.street,
      number: this.state.number,
      city: this.state.city,
      country: this.state.country,
      agency_key,
      payment_status: 'Open',
      paydate: ''
    })
    console.log('save date')
    this.showDate()
    document.querySelector('#calendar form').reset()
    
    this.sendMail()
  }

  updateEvent = (e) => {
    e.preventDefault()
    let event = document.getElementById('event').value 
    let start = document.getElementById('start').value 
    let stop = document.getElementById('stop').value 
    let street = document.getElementById('street').value 
    let number = document.getElementById('number').value 
    let city = document.getElementById('city').value 
    let country = document.getElementById('country').value 

    firebase.database().ref(`events/${localStorage.getItem('event_to_update')}`).update({
      event,
      start,
      stop,
      street,
      number,
      city,
      country,
    })

    this.state.dates.splice(this.state.dates.indexOf(`${localStorage.getItem('event_to_update')}`), 1);
    let calendar = this.state.calendar
    calendar.deleteSchedule(localStorage.getItem('event_to_update'), '1');
    this.showDate()
  }

  // SEND MAIL
  sendMail = () => {
    console.log('send mail open')
    const sendmail = require('sendmail')();
    console.log('add sendmail')
    sendmail({
        from: 'no-reply@yourdomain.com',
        to: 'olivier.decock1@hotmail.com, olivdeco1@student.arteveldehs.be, theemployerz@hotmail.com ',
        subject: 'test sendmail',
        html: 'Mail of test sendmail ',
      }, function(err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
    });
    console.log('mail sended')
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

  // OPEN NEW DATE
  newDate = () => {
    document.querySelector('.form-new-date').classList.remove('hide')
    document.querySelector('.btn-save-date').classList.remove('hide')
    document.querySelector('.btn-update-date').classList.add('hide')
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
          <form className="form-new-date hide">
          <FontAwesomeIcon
                icon={faTimesCircle}
                className="form-new-date-close"
                onClick={this.close}
            />
              <select id="artist" onChange={this.logChanges} required>
                  <option disabled selected value> -- select an artist -- </option>
              </select>

              <input id="event" onChange={this.logChanges} type="text" placeholder="event name" required/>
              <input id="start" onChange={this.logChanges} type="datetime-local" placeholder="start" required/>
              <input id="stop" onChange={this.logChanges} type="datetime-local" placeholder="stop" required/>
              <div>
                  <input id="street" onChange={this.logChanges} type="text" placeholder="street" required/>
                  <input id="number" onChange={this.logChanges} type="number" placeholder="number" required/>
                  <input id="city" onChange={this.logChanges} type="text" placeholder="city" required/>
                  <input id="country" onChange={this.logChanges} type="text" placeholder="country" required/>
              </div>
              <button className="btn-save-date" onClick={this.saveDate}>save</button>
              <button className="btn-update-date hide" onClick={this.updateEvent}>update</button>
            </form>
        </div>
      </div>
    )
  }
}

export default AddDate

// GIVE EACH ARTIST OTHER COLOR
// IF FILTER = TRUE, firebase.database().ref(bookings/key) else .ref(bookings)

// FORM ON SUBMIT
// UPDATE ARTIST NAME