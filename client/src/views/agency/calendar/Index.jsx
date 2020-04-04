import React, { Component } from 'react'
import firebase from '../../../config/firebase'
import '../../../style/_general.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faPenSquare, faTimesCircle  } from '@fortawesome/free-solid-svg-icons'


// COMPONENTS
import LogoutBtn from '../../components/Logout'
import Navigation from '../../components/Navigation'
import Header from '../../components/Header'
import AddDate from './AddDate'

// CALENDAR COMPONENTS
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { Scheduler, DayView, Appointments } from "@devexpress/dx-react-scheduler-material-ui";

import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventSettingsModel } from '@syncfusion/ej2-react-schedule'


export class Index extends Component {
    
    addArtist = (e) => {
        document.querySelector('.container-add-new-date').classList.remove('hide')
        document.querySelector('.close-btn').classList.remove('hide')
        document.querySelector('.add-btn').classList.add('hide')
    }

    close = (e) => {
        document.querySelector('.add-btn').classList.remove('hide')
        document.querySelector('.container-add-new-date').classList.add('hide')
        document.querySelector('.close-btn').classList.add('hide')
    }
    
    render() {
        return (
            <div>
                <div className="header-dashboard">
                    <Header/>
                </div>
                <div className="container-work-body">
                    <div className="navigation">
                        <Navigation />
                        <div className="navigation-child"></div>
                    </div>
                    <div className="work-body">
                        {/* <ScheduleComponent currentView="Month" selectedDate={new Date(2020, 4, 4)}>
                            <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
                        </ScheduleComponent> */}
                        <AddDate/>
                        <div className="tooltip-add-artist add-btn">
                            <span className="tooltiptext-left">add date</span>
                            <FontAwesomeIcon
                                icon={faPlusCircle}
                                className="icon-add"
                                onClick={this.addArtist}
                            />
                        </div>
                        <div className="tooltip-add-artist close-btn hide">
                            <span className="tooltiptext-left">close</span>
                            <FontAwesomeIcon
                                icon={faTimesCircle}
                                className="icon-add"
                                onClick={this.close}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Index
