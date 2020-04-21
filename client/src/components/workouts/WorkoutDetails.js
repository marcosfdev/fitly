import React, { useEffect } from 'react'
import Moment from 'react-moment';
import { useSelector, useDispatch } from "react-redux";
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';

import Default from '../../assets/Default.png'
import { fetchWorkout } from '../../store/modules/workouts/actions/workoutsAction'
import Navigation from '../Navigation'
import Likes from '../likes/Likes'
import Comments from '../comments/Comments'
import Comment from '../comments/Comment'
import EditWorkout from './EditWorkout';
import DeleteWorkout from './DeleteWorkout'

const WorkoutDetails = (props) => {

  const workoutID  = props.match.params.id

  const dispatch = useDispatch()

  const singleWorkout = id => dispatch(fetchWorkout(id))

  const currentState = useSelector(state => state)

  const workout = currentState.WorkoutsState.workout

  const workoutComments = currentState.WorkouttsState

  const authID = currentState.Auth.currentUser ? currentState.Auth.currentUser.id : ""

//Get the avatar of the author of the workout
  let imagePreview = null;
  let avatarPathWorkout = workout.author ? workout.author.avatar_path : null
  if(avatarPathWorkout){
    imagePreview = (<img className="img_style_workout" src={avatarPathWorkout} alt="profile"/>);
  } else {
    imagePreview = (<img className="img_style_workout" src={Default} alt="profile"/>);
  }


  useEffect(() => {
    singleWorkout(workoutID)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let singleWorkoutComments = []

  if(workoutComments){
    // eslint-disable-next-line array-callback-return
    workoutComments.commentItems.map(eachItem => {
      if(eachItem.workoutID === workoutID){
        singleWorkoutComments = eachItem.comments  
      } 
    }) 
  }

  return (
    <div>
      <Navigation />
      <div className="container">
        <div className="mt-5 style-card">
          <Card>
            <CardBody style={{paddingBottom: "0px"}}>
            <CardTitle>
              <span>
                <span className="mr-2">
                  {imagePreview}
                </span>
                <span href="" style={{fontWeight: 'bold'}}>{workout.author ? workout.author.username : ""}</span>
              </span>
              <span style={{float: 'right'}}>
                <Moment fromNow>
                  {workout ? workout.created_at : ""}
                </Moment>
              </span>
              </CardTitle>
              <CardTitle>{workout.title}</CardTitle>
              <CardText>{workout.content}</CardText>
              <div className="style-fav">
                <Likes workoutID={Number(workoutID)} />
                <Comments workoutID={workoutID} />
                { authID === workout.author_id ? (
                <div className="ml-auto">
                  <span style={{marginRight: "20px"}}>
                    <EditWorkout workout={workout} />
                  </span>
                  <span>
                    <DeleteWorkout workoutID={workout.id} />
                  </span>
                </div>
              ) : ""}
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="mt-3 style-card-comment">
          {singleWorkoutComments ? singleWorkoutComments.map(comment => {
            return (
              <Comment comment={comment} key={comment.id} />
            )
          }) 
          : ""
          }
        </div>
      </div>
    </div>
  )
}

export default WorkoutDetails