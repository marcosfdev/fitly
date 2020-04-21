import { combineReducers } from "redux"
import authReducer  from './auth/reducer/authReducer'
import { workoutsState }  from "./workouts/reducer/workoutsReducer";
import { likesState } from './likes/reducer/likesReducer'
import { commentsState } from './comments/reducer/commentsReducer'


const reducer = combineReducers({
  Auth: authReducer,
  WorkoutsState: workoutsState,
  LikesState: likesState,
  CommentsState: commentsState
})

export default reducer