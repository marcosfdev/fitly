import React, { useState } from "react";
import { Label, Input, FormGroup, Button, Card, CardHeader, CardBody } from "reactstrap";
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import "./Workouts.css";
import Navigation from '../Navigation'
import { createWorkout } from '../../store/modules/workouts/actions/workoutsAction';

const CreateWorkout = () => {

  const currentState = useSelector((state) => state);

  const [workout, setWorkout] = useState({
    title:'',
    content: '',
  });
  const dispatch = useDispatch()

  const addWorkout = (workoutDetails) => dispatch(createWorkout(workoutDetails))

  const handleChange = e => {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value
    })
  }
  const submitUser = (e) => {
    e.preventDefault()
    addWorkout({
      title: workout.title,
      content: workout.content,
    });
  }

  if(!currentState.Auth.isAuthenticated){
    return <Redirect to='/login' />
  }
    return (
      <div>
        <div>
          <Navigation />
        </div>
        <div className="workout-style container App">
        <Card className="card-style">
          <CardHeader>Create Workout</CardHeader>
          <CardBody>
          <form onSubmit={submitUser}>
          <FormGroup>
            <Label>Title</Label>
            <Input type="text" name="title" placeholder="Enter title"  onChange={handleChange}/>
            { currentState.WorkoutsState.workoutsError && currentState.WorkoutsState.workoutsError.Required_title ? (
              <small className="color-red">{currentState.WorkoutsState.workoutsError.Required_title}</small>
              ) : (
                ""
              )}
              { currentState.WorkoutsState.workoutsError && currentState.WorkoutsState.workoutsError.Taken_title ? (
              <small className="color-red">{ currentState.WorkoutsState.workoutsError.Taken_title }</small>
              ) : (
                ""
              )}
          </FormGroup>
          <FormGroup>
            <Label>Content</Label>
            <Input type="textarea" cols="30" rows="6" name="content" id="" placeholder="Enter a short description" onChange={handleChange} />
            { currentState.WorkoutsState.workoutsError && currentState.WorkoutsState.workoutsError.Required_content ? (
              <small className="color-red">{currentState.WorkoutsState.workoutsError.Required_content}</small>
              ) : (
                ""
              )}
            </FormGroup>

            { currentState.WorkoutsState.isLoading ? (
              <Button
                color="primary"
                type="submit"
                block
                disabled
              >
                Creating...
            </Button>
            ) : (
              <Button
                color="primary"
                type="submit"
                block
              >
              Create Workout
            </Button>
            )}
            </form>
            </CardBody>
          </Card>
        </div>
        </div>
    );
}

export default CreateWorkout