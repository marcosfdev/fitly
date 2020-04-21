import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import '../workouts/Workouts.css';
import { fetchComments } from '../../store/modules/comments/actions/commentsAction';
import CreateComment from './CreateComment'
import { history } from '../../history'




const Comments = ({ workoutID }) => {

  const dispatch = useDispatch()

  const currentState = useSelector((state) => state);

  const authID = currentState.Auth.currentUser ? currentState.Auth.currentUser.id : ""

  const workoutComments = currentState.CommentsState

  const getWorkoutComments = id => dispatch(fetchComments(id))

  let singleWorkoutComments = []

  if(workoutComments){
    // eslint-disable-next-line array-callback-return
    workoutComments.commentItems.map(eachItem => {
      if(eachItem.workoutID === workoutID){
        singleWorkoutComments = eachItem.comments  
      } 
    }) 
  }

  const noAuth = (e) => {
    e.preventDefault()
    history.push('/login');
  }

  useEffect(() => {
    getWorkoutComments(workoutID);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="style-heart-outer">
      <span className="mr-4">
        { authID ? 
        <span>
          <CreateComment workoutID={workoutID} />
        </span> 
         : 
         <span onClick={noAuth}>
          <CreateComment />
         </span>
         }
        <span className="ml-2">
          {singleWorkoutComments.length}
        </span>
        <div></div>
      </span>
    </div>
  )
}

export default Comments