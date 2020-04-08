import React, { Component } from 'react'
import firebase from '../../../config/firebase'
import Calendar from 'tui-calendar'
import "tui-calendar/dist/tui-calendar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

export class AddDate extends Component {

  state = {
    calendar: '',
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
    })

    // CLICK EVENTS
    calendar.on({
      'beforeUpdateSchedule': function (e) {
        document.querySelector('.btn-save-date').classList.add('hide')
        document.querySelector('.btn-update-date').classList.remove('hide')

        firebase.database().ref(`events/${e.schedule.id}`).on('value', snapshot => {
          let data = snapshot.val()

          document.getElementById('event').value = data.event
          document.getElementById('start').value = data.start
          document.getElementById('stop').value = data.stop
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
      firebase.database().ref('artist').on('value', snapshot => {
        snapshot.forEach((childSnapshot) => {
          const data = childSnapshot.val();
          if (agencyKey === data.agency_key) {
              let option = `<option value="${childSnapshot.key}">${data.artist_name}</option>`
              document.getElementById('artist').insertAdjacentHTML('beforeend', option)
          }
        });
      })
    this.showDate()
  }

  // NEW DATE
  showDate = () => {
    firebase.database().ref('events').on('value', snapshot => {
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
          let calendar = this.state.calendar
          calendar.createSchedules([
            {
              id: `${childSnapshot.key}`,
              calendarId: '1',
              title: `artist - ${data.event}`,
              category: 'time',
              location: `${data.adres}`,
              color: 'white',
              bgColor: 'blue',
              dueDateClass: '',
              start: `${data.start}`,
              end: `${data.stop}`
            }
          ])
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
        agency_key,
    })
    document.querySelector('#calendar form').reset() 
  }

  updateEvent = (e) => {
    e.preventDefault()
  }

  // MOVE TO today/prev/next
  prev = (e) => {
    let calendar = this.state.calendar
    console.log(e.target.value)
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

              <select id="client" onChange={this.logChanges} required>
                  <option disabled selected value> -- select a client -- </option>
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

// calendar.deleteSchedule(schedule.id, schedule.calendarId);

// calendar.updateSchedule(schedule.id, schedule.calendarId, {
//   start: startTime,
//   end: endTime
// });

// add new key in state read it load