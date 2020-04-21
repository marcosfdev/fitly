import { BEFORE_STATE_WORKOUT, FETCH_WORKOUTS, FETCH_WORKOUTS_ERROR, CREATE_WORKOUT_SUCCESS, UPDATE_WORKOUT_SUCCESS, CREATE_WORKOUT_ERROR, UPDATE_WORKOUT_ERROR, GET_WORKOUT_SUCCESS, GET_WORKOUT_ERROR, DELETE_WORKOUT_SUCCESS, DELETE_WORKOUT_ERROR, FETCH_AUTH_WORKOUTS, FETCH_AUTH_WORKOUTS_ERROR } from '../workoutsType'

export const initState = {
  workouts: [],
  authWorkouts: [],
  workout: {},
  workoutsError: null,
  isLoading: false,
}

export const workoutsState = (state = initState, action) => {

  const { payload, type } = action
  switch(type) {

    case BEFORE_STATE_WORKOUT:
      return {
        ...state,
        workoutsError: null,
        isLoading: true,
      }
    case FETCH_WORKOUTS:
      return { 
        ...state, 
        workouts: payload,
        isLoading: false,
      }
      
    case FETCH_WORKOUTS_ERROR:
      return { 
        ...state, 
        workoutsError: payload,
        isLoading: false 
      }

    case FETCH_AUTH_WORKOUTS:
      return { 
        ...state, 
        authWorkouts: payload,
        isLoading: false,
      }

    case FETCH_AUTH_WORKOUTS_ERROR:
      return { 
        ...state, 
        workoutsError: payload,
        isLoading: false 
      }

    case GET_WORKOUT_SUCCESS:
      return { 
        ...state, 
        workout: payload,
        workoutsError: null,
        isLoading: false  
      }

    case GET_WORKOUT_ERROR:
      return { 
        ...state, 
        workoutsError: payload,
        isLoading: false 
      }

    case CREATE_WORKOUT_SUCCESS:
      return { 
        ...state, 
        workouts: [payload, ...state.workouts],
        authWorkouts: [payload, ...state.authWorkouts],
        workoutsError: null,
        isLoading: false  
      }

    case CREATE_WORKOUT_ERROR:
      return { 
        ...state, 
        workoutsError: payload,
        isLoading: false  
      }

    case UPDATE_WORKOUT_SUCCESS:
      return { 
        ...state, 
        workouts: state.workouts.map(workout => 
          workout.id === payload.id ? 
          {...workout, title: payload.title, content: payload.content } : workout
        ),
        authWorkouts: state.authWorkouts.map(workout => 
          workout.id === payload.id ? 
          {...workout, title: payload.title, content: payload.content } : workout
        ),
        workout: payload,
        workoutsError: null,
        isLoading: false 
      }

    case UPDATE_WORKOUT_ERROR:
      return { 
        ...state, 
        workoutsError: payload,
        isLoading: false  
      }

     case DELETE_WORKOUT_SUCCESS:
      return { 
        ...state, 
        workouts: state.workouts.filter(workout => workout.id !== payload.deletedID),
        authWorkouts: state.authWorkouts.filter(workout => workout.id !== payload.deletedID),
        workoutsError: null,
        isLoading: false   
      }

    case DELETE_WORKOUT_ERROR:
      return { 
        ...state, 
        workoutsError: payload,
        isLoading: false  
      }

    default:
      return state
  }
}