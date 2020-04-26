import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

// VIEWS
import LoginView from './views/Index/Login'
import RegisterView from './views/Index/Register'

// AGENCY
import ArtistAgencyView from './views/agency/artist/Index'
import ClientAgencyView from './views/agency/client/Index'
import CalendarAgencyView from './views/agency/calendar/Index'
import SettingsAgencyView from './views/agency/settings/Index'

// ARTIST
import DashboardArtistView from './views/artist/dashboard/Index'
import CalendarArtistView from './views/artist/calendar/Index'
import SettingsArtistView from './views/artist/settings/Index'

// GENERAL
import PageNotFound from './views/PageNotFound'
import PrivacyPolicy from './views/PrivacyPolicy'

function App() {
  return (
    <Router>
      <Switch>
        <Route path ="/register" component={RegisterView} exact />
        <Route path="/login" component={LoginView} exact />
        <Route path="/" component={LoginView} exact />

        {/* ROUTES AGENCY */}
        <Route path="/dashboard-agency" component={ArtistAgencyView} exact />
        <Route path="/client-agency" component={ClientAgencyView} exact />
        <Route path="/calendar-agency" component={CalendarAgencyView} exact />
        <Route path="/settings-agency" component={SettingsAgencyView} exact />

        {/* ROUTES ARTIST */}
        <Route path="/dashboard-artist" component={DashboardArtistView} exact />
        <Route path="/calendar-artist" component={CalendarArtistView} exact />
        <Route path="/settings-artist" component={SettingsArtistView} exact />

        <Route path="/privacy-policy" component={PrivacyPolicy} exact />
        <Route path="*" component={PageNotFound}/>
      </Switch>
    </Router>
  );
}

export default App;
