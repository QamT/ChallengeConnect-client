import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Error from './pages/Error';
import Loader from './components/Loader';
const Home = lazy(() => import('./pages/Home'));
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const Profile = lazy(() => import('./pages/Profile'));
const Challenge = lazy(() => import('./components/Challenge'));

export default () => (
  <Router>
    <Suspense fallback={Loader}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/profile' component={Profile} />
        <Route path='/challenge' component={Challenge} />
        <Route component={Error} />
      </Switch>
    </Suspense>
  </Router>
)

