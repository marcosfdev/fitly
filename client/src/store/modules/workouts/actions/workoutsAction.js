import API_ROUTE from "../../../../apiRoute";
import axios from 'axios'
import { BEFORE_STATE_WORKOUT, FETCH_WORKOUTS, FETCH_WORKOUTS_ERROR, GET_WORKOUT_SUCCESS, GET_WORKOUT_ERROR, CREATE_WORKOUT_SUCCESS, CREATE_WORKOUT_ERROR, UPDATE_WORKOUT_SUCCESS, UPDATE_WORKOUT_ERROR, DELETE_WORKOUT_SUCCESS, DELETE_WORKOUT_ERROR, FETCH_AUTH_WORKOUTS, FETCH_AUTH_WORKOUTS_ERROR  } from '../workoutsType'
import  {history} from '../../../../history'
 
export const fetchWorkouts = () => {

  return (dispatch) => {

    axios.get(`${API_ROUTE}/workouts`).then(res => {
      dispatch({ type: FETCH_WORKOUTS, payload: res.data.response })
    }).catch(err => {
      dispatch({ type: FETCH_WORKOUTS_ERROR, payload: err.response ? err.respons.data.error : "" })
    })
  }
}

export const fetchWorkout = id => {

  return async (dispatch) => {

    dispatch({ type: BEFORE_STATE_WORKOUT })

    try {
      const res  = await axios.get(`${API_ROUTE}/workouts/${id}`)
      dispatch({ type: GET_WORKOUT_SUCCESS, payload: res.data.response })
    } catch(err){
      dispatch({ type: GET_WORKOUT_ERROR, payload: err.response.data.error })
      history.push('/'); //incase the user manually enter the param that doesnt exist
    }
  }
}

export const fetchAuthWorkouts = id => {

  return async (dispatch) => {

    dispatch({ type: BEFORE_STATE_WORKOUT})

    try {
      const res  = await axios.get(`${API_ROUTE}/user_workouts/${id}`)
      dispatch({ type: FETCH_AUTH_WORKOUTS, payload: res.data.response })
    } catch(err){
      dispatch({ type: FETCH_AUTH_WORKOUTS_ERROR, payload: err.response.data.error })
    }
  }
}

export const createWorkout = (createWorkout) => {
  return async (dispatch) => {

    dispatch({ type: BEFORE_STATE_WORKOUT})

    try {
      const res = await axios.workout(`${API_ROUTE}/workouts`, createWorkout)
      dispatch({ 
        type: CREATE_WORKOUT_SUCCESS,  
        payload: res.data.response
      })
      history.push('/');
    } catch(err) {
      dispatch({ type: CREATE_WORKOUT_ERROR, payload: err.response.data.error })
    }
  }
}

export const updateWorkout = (updateDetails, updateSuccess) => {

  return async (dispatch) => {

    dispatch({ type: BEFORE_STATE_WORKOUT})

    try {
      const res = await axios.put(`${API_ROUTE}/workouts/${updateDetails.id}`, updateDetails)
      dispatch({ 
        type: UPDATE_WORKOUT_SUCCESS,
        payload: res.data.response
      })
      updateSuccess()
    } catch(err) {
      dispatch({ type: UPDATE_WORKOUT_ERROR, payload: err.response.data.error })
    }
  }
}

export const deleteWorkout = (id) => {

  return async (dispatch) => {

    dispatch({ type: BEFORE_STATE_WORKOUT})

    try {
      const res = await axios.delete(`${API_ROUTE}/workouts/${id}`)
      dispatch({ 
        type: DELETE_WORKOUT_SUCCESS,
        payload: {
          deletedID: id,
          message: res.data.response
        } 
      })
      history.push('/');
    } catch(err) {
      dispatch({ type: DELETE_WORKOUT_ERROR, payload: err.response.data.error })
    }
  }
}