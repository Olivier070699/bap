import React, { Component } from 'react'
import firebase from '../../../config/firebase'
import Calendar from 'tui-calendar'
import axios from 'axios'
import "tui-calendar/dist/tui-calendar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
 
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

   let getDate = calendar.getDate()
   let date = JSON.stringify(getDate)
  
   this.setState({
     calendar,
     test: 0,
     date: date.substring(10, 17),
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
         if(data.client_email){
           document.getElementById('client_email').value = data.client_email
         }
       })
       document.querySelector('.form-new-date').classList.remove('hide')
       document.querySelector('.form-new-date').classList.add('update')
     },
     'beforeDeleteSchedule': function (e) {
       firebase.database().ref(`events/${e.schedule.id}`).remove()
       calendar.deleteSchedule(e.schedule.id, e.schedule.calendarId);
       NotificationManager.success('Date is deleted succesfully.', 'Succeeded!');
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
   let agencyKey = localStorage.getItem('agency_key')
   console.log('showdate')
   firebase.database().ref('events').on('value', snapshot => {
     snapshot.forEach((childSnapshot) => {
       if (this.state.dates.includes(childSnapshot.key) === false && childSnapshot.val().agency_key === agencyKey) {
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
               bgColor: snap.val().color,
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
     paydate: '',
     client_email: this.state.client_email
   })
   console.log('save date')
   this.showDate()
   document.querySelector('#calendar form').reset()
   NotificationManager.success('New date is added succesfully.', 'Succeeded!');
   this.sendMail()
   }
 
 updateEvent = (e) => {
   let event = document.getElementById('event').value
   let start = document.getElementById('start').value
   let stop = document.getElementById('stop').value
   let street = document.getElementById('street').value
   let number = document.getElementById('number').value
   let city = document.getElementById('city').value
   let country = document.getElementById('country').value
   let client_email = document.getElementById('client_email').value
 
   firebase.database().ref(`events/${localStorage.getItem('event_to_update')}`).update({
     event,
     start,
     stop,
     street,
     number,
     city,
     country,
     client_email
   })
 
   this.state.dates.splice(this.state.dates.indexOf(`${localStorage.getItem('event_to_update')}`), 1);
   let calendar = this.state.calendar
   calendar.deleteSchedule(localStorage.getItem('event_to_update'), '1');
   NotificationManager.success('Date is updatet succesfully.', 'Succeeded!');
   this.showDate()
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
   document.querySelector('.form-new-date').classList.add('new')
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
 
 // SEND MAIL
  sendMail = () => {
   firebase.database().ref(`artist/${this.state.artist}`).on('value', snap => {
     let receiver = this.state.client_email
     let subject = `${this.state.event} - ${snap.val().artist_name}`
     let body = `This is an automatic reply. We confirm your booking request. ${snap.val().artist_name} will be playing at ${this.state.event} from ${this.state.start} till ${this.state.stop}. Thx for having us!`

     const instance = axios.create({
      headers: {
        "Content-Type": "application/json",
      }
    })
    console.log(instance)
    instance.post('http://od.mediabelgium.be/home/sendmail',{
      Receiver: receiver,
      Subject: subject,
      Body: body
      })
      .then(function (response) {
      console.log(response);
      })
      .catch(function (error) {
      console.log(error);
      console.log(error.response.status)
    });
   })
 }
 
 render() {
   return (
     <div className="container-add-new-date">
       <div className="container-calendar-navigation">
        <p>{this.state.date}</p>
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
             <select id="artist" onChange={this.logChanges} required>
                 <option disabled selected value> -- select an artist -- </option>
             </select>
 
             <input id="event" onChange={this.logChanges} type="text" placeholder="event name" required/>
             <input id="client_email" onChange={this.logChanges} type="email" placeholder="client email" required/>
             <input id="start" onChange={this.logChanges} type="datetime-local" placeholder="start" required/>
             <input id="stop" onChange={this.logChanges} type="datetime-local" placeholder="stop" required/>
             <div>
                 <input id="street" onChange={this.logChanges} type="text" placeholder="street" required/>
                 <input id="number" onChange={this.logChanges} type="number" placeholder="number" required/>
                 <input id="city" onChange={this.logChanges} type="text" placeholder="city" required/>
                 <input id="country" onChange={this.logChanges} type="text" placeholder="country" required/>
             </div>
             <button className="btn-save-date">save</button>
             <button className="btn-update-date hide">update</button>
           </form>
       </div>
       <NotificationContainer/>
     </div>
   )
 }
}
 
export default AddDate