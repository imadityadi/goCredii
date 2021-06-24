import {combineReducers} from 'redux'
import basicDetailsReducer from './basicDetailsReducer'
import createUserReducer from './createUserReducer'
const rootReducer = combineReducers({
     basicDetailsReducer,
   createUserReducer,
})

export default rootReducer