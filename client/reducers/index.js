/**
 * ************************************
 *
 * @module  index.js
 * @author  smozingo
 * @date    11/12/17
 * @description simply a place to combine reducers
 *
 * ************************************
 */

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

// import all reducers here
import userReducer from './userReducer';
import assessmentReducer from "./assessmentReducer";
import screenReducer from "./screenReducer";


// combine reducers
const reducers = combineReducers({
    form: formReducer,
    user: userReducer,
    assessment: assessmentReducer,
    screens: screenReducer
});

// make the combined reducers available for import
export default reducers;

