import { combineReducers } from 'redux'
import userReducer from './userReducer'
import postReducer from './postReducer'
import messageReducer from './messageReducer'

const rootReducer = combineReducers({
   auth : userReducer,
   post : postReducer,
   message : messageReducer
}) 

export default rootReducer