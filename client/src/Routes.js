import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CreateWorkout from './components/workouts/CreateWorkout';
import Dashboard from './components/Dashboard';
import { history } from './history'
import Profile from './components/users/Profile';
import ForgotPassword from './components/users/ForgotPassword.js';
import ResetPassword from './components/users/ResetPassword';
import WorkoutDetails from './components/workouts/WorkoutDetails'
import AuthWorkouts from './components/workouts/AuthWorkouts'



const Routes  = () => {
    return (
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route exact path='/' component={ Dashboard } />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Register} />
            <Route path='/createworkout' component={CreateWorkout} />
            <Route path='/profile/:id' component={Profile} />
            <Route path='/forgotpassword' component={ForgotPassword} />
            <Route path='/resetpassword/:token' component={ResetPassword} />
            <Route path='/workouts/:id' component={WorkoutDetails} />
            <Route path='/authworkouts' component={AuthWorkouts} />
          </Switch>
        </div>
      </Router>
    );
}

export default Routes;