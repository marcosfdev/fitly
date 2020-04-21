import React, { useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { FaFilter } from 'react-icons/fa'

import { fetchAuthWorkouts } from '../../store/modules/workouts/actions/workoutsAction';
import AuthWorkout from './AuthWorkout'
import Navigation from '../Navigation'
import './Workouts.css';


const AuthWorkouts = () => {

  const currentState = useSelector((state) => state.Auth);
  const authID = currentState.currentUser.id

  const workoutsSelector = useSelector((state) => state.WorkoutsState);
  const dispatch = useDispatch();

  const getAuthWorkouts = id => dispatch(fetchAuthWorkouts(id));

  useEffect(() => {
    getAuthWorkouts(authID);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

   //incase someone visits the route manually
  if(!currentState.isAuthenticated){
    return <Redirect to='/login' />
  }

  let authWorkouts = workoutsSelector.authWorkouts.map(workout => {
    return (
      <div  className="mt-2 style-card" key={workout.id}>
       <Link to={'/workouts/' + workout.id} key={workout.id}>
        <AuthWorkout workout={workout} key={workout.id} />
      </Link>
    </div>
      );
  })
    

  return (
    <div className="App">
      <div>
        <Navigation />
      </div>
      <div className="container">
        { authWorkouts.length > 0 ? (
          <div className="container">{authWorkouts}</div>
        ) : ( 
          <div className="text-center mt-4">
            <div style={{fontSize: "100px"}}><FaFilter /></div>
            <p className="mt-2">It seems you have not created any workouts yet.</p>
            <p>Click the button the button below to create one</p>
            <div className="mt-4">
              <Link to="/createworkout" className="btn btn-primary">Create Workout</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthWorkouts