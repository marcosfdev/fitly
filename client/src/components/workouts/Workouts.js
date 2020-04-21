import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import './Workouts.css';

import { fetchWorkouts } from '../../store/modules/workouts/actions/workoutsAction';
import Workout from './Workout'


const Workouts = () => {

  const workoutsSelector = useSelector((state) => state.WorkoutsState);
  const dispatch = useDispatch();

  // console.log("this is the workout state: ", workoutsSelector)

  const getWorkouts = () => dispatch(fetchWorkouts());

  useEffect(() => {
    getWorkouts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let workouts = workoutsSelector.workouts.map((workout) => {
    return (
      <div  className="mt-2 style-card" key={workout.id}>
         <Link to={'/workouts/' + workout.id} key={workout.id}>
          <Workout workout={workout} key={workout.id} />
        </Link>
      </div>
    );
  })
  return (
    <div className="container">{workouts}</div>
  )
}

export default Workouts