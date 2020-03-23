import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

// VIEWS
import LoginView from './views/Index/Login'
import RegisterView from './views/Index/Register'

// AGENCY
import DashboardAgencyView from './views/agency/dashboard/Index'
import ArtistAgencyView from './views/agency/artist/Index'
import ClientAgencyView from './views/agency/client/Index'
import CalendarAgencyView from './views/agency/calendar/Index'
import SettingsAgencyView from './views/agency/settings/Index'

// ARTIST
import DashboardArtistView from './views/artist/dashboard/Index'

function App() {
  return (
    <Router>
      <Switch>
        <Route path ="/register" component={RegisterView} exact />
        <Route path="/login" component={LoginView} exact />
        <Route path="/" component={LoginView} exact />

        {/* ROUTES AGENCY */}
        <Route path="/dashboard-agency" component={DashboardAgencyView} exact />
        <Route path="/artist-agency" component={ArtistAgencyView} exact />
        <Route path="/client-agency" component={ClientAgencyView} exact />
        <Route path="/calendar-agency" component={CalendarAgencyView} exact />
        <Route path="/settings-agency" component={SettingsAgencyView} exact />

        {/* ROUTES ARTIST */}
        <Route path="/dashboard-artist" component={DashboardArtistView} exact />

      </Switch>
    </Router>
  );
}

export default App;
