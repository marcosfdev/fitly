import React from 'react'
import Moment from 'react-moment';
import { useSelector } from 'react-redux'
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';

import './Workouts.css';
import Default from '../../assets/Default.png'
import Likes from '../likes/Likes'
import Comments from '../comments/Comments'
import EditWorkout from './EditWorkout';
import DeletePost from './DeleteWorkout'
import Workouts from './Workouts';



const Workout = ({ workout }) => {

  const currentState = useSelector(state => state)
  const authID = currentState.Auth.currentUser ? currentState.Auth.currentUser.id : ""

  let $imagePreview = null;
  if(workout.author.avatar_path){
    $imagePreview = (<img className="img_style_post" src={workout.author.avatar_path} alt="no one"/>);
  } else {
    $imagePreview = (<img className="img_style_workout" src={Default} alt="no one 2"/>);
  }
  
  return (
    <Card className="style-card-main">
      <CardBody className="style-card-body">
      <CardTitle>
        <span>
          <span className="mr-2">
            {$imagePreview}
          </span>
          <span href="" style={{fontWeight: 'bold'}}>{workout.author.username}</span>
        </span>
        <span style={{float: 'right'}}>
          <Moment fromNow>{workout.created_at}</Moment>
        </span>
        </CardTitle>
        <CardTitle>{workout.title}</CardTitle>
        <CardText>{workout.content}</CardText>
        <div className="style-fav">
            <>
              <Likes workoutID={workout.id} />
              <Comments workoutID={workout.id} />
            </>
          { authID === workout.author_id ? (
            <div className="ml-auto">
              <span style={{marginRight: "20px"}}>
                <EditWorkout workout={workout} />
              </span>
              <span>
                <DeletePost workoutID={workout.id} />
              </span>
            </div>
          ) : ""}
        </div>
      </CardBody>
    </Card>
  )
}

export default Workout