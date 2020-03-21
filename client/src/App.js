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

function App() {
  return (
    <Router>
      <Switch>
        <Route path ="/register" component={RegisterView} exact />
        <Route path="/login" component={LoginView} exact />
        <Route path="/" component={LoginView} exact />
      </Switch>
    </Router>
  );
}

export default App;
