
import reducer from './reducer';
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    reducer : reducer, 
})


export default rootReducer;