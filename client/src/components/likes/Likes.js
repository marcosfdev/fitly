import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaRegHeart, FaHeart } from 'react-icons/fa'

import '../workouts/Workouts.css';
import { createLike, deleteLike, fetchLikes } from '../../store/modules/likes/actions/likesAction';
import { history } from '../../history'


const Likes = ({ workoutID }) => {

  const dispatch = useDispatch()

  const currentState = useSelector((state) => state);

  const workoutLikes  =  currentState.LikesState

  const authID = currentState.Auth.currentUser ? currentState.Auth.currentUser.id : ""

  let workoutLike = 0
  let likeID = null
  let authLiked  = false

  if(workoutLikes){
    // eslint-disable-next-line array-callback-return
    workoutLikes.likeItems.map(eachItem => {
      if(eachItem.workoutID === workoutID){
        workoutLike = eachItem.likes.length  

        // eslint-disable-next-line array-callback-return
        eachItem.likes.map(eachLike => {
          if(eachLike.user_id === authID){
            authLiked = true
            likeID = eachLike.id
          } 
        })  
      }
    }) 
  }

  const getWorkoutLikes = id => dispatch(fetchLikes(id));
  const addLike = id => dispatch(createLike(id))
  const removeLike = details => dispatch(deleteLike(details))

  useEffect(() => {
    getWorkoutLikes(workoutID);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const unLike = (e) => {
    e.preventDefault()
    let id = likeID
    removeLike({id, workoutID})
  }

  const saveLike = (e) => {
    e.preventDefault()
    addLike(workoutID)
  }

  const likeToggle = (e) => {
    e.preventDefault()
    authLiked ? unLike(e) : saveLike(e)
  }
  const noAuth = (e) => {
    e.preventDefault()
    history.push('/login');
  }

  return (
    <div className="style-fav">
      <div className="style-heart-outer">
        <span className="mr-4">
          { authID ? (
            <span onClick={likeToggle}>
            { authLiked ? 
              <FaHeart className="style-auth"/>
              :
              <FaRegHeart className="style-heart"/>
            }
            <span className="ml-2">
              {workoutLike}
            </span>
          </span>
          ) : (
            <span onClick={noAuth}>
              <FaRegHeart className="style-heart"/>
            <span className="ml-2">
              {workoutLike}
            </span>
          </span>
          )}
        </span>
      </div>
    </div>
  )
}

export default Likes