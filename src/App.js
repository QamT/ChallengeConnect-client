import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './routes/Home';
import Register from './routes/Register';
import Login from './routes/Login';
import Profile from './routes/Profile';
import Challenge from './components/Challenge'
import Error from './routes/Error';

export default () => (
  <Router>
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/profile' component={Profile} />
        <Route path='/challenge' component={Challenge} />
        <Route component={Error} />
      </Switch>
    </div>
  </Router>
)
