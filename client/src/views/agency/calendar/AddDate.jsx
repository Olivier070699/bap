import React, { Component } from 'react'
import firebase from '../../../config/firebase'
import Calendar from 'tui-calendar'
import "tui-calendar/dist/tui-calendar.css";

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
      'beforeUpdateSchedule': function(e) {
          console.log('beforeUpdateSchedule', e);
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

  onSubmit = (e) => {
    e.preventDefault()
    let adres = `${this.state.street} ${this.state.number}, ${this.state.city} ${this.state.country}`
    firebase.database().ref(`events`).push({
        artist: this.state.artist,
        client: '',
        event: this.state.event,
        start: this.state.start,
        stop: this.state.stop,
        adres: adres,
    })
    document.querySelector('#calendar form').reset() 
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

  render() {
    return (
      <div id="calendar">
        <button value="prev" onClick={this.prev}>prev</button>
        <button value="today" onClick={this.today}>today</button>
        <button value="next" onClick={this.next}>next</button>

        <select onChange={this.changeView}>
          <option value="month">Month</option>
          <option value="week">Week</option>
          <option value="day">Day</option>
        </select>

        <form onSubmit={this.onSubmit}>
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
          <button>save</button>
        </form>
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