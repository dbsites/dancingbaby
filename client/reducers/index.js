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
import cardsReducer from './cardsReducer';
import userReducer from './userReducer';


// combine reducers
const reducers = combineReducers({
    cards: cardsReducer,
    form: formReducer,
    user: userReducer,
});

// make the combined reducers available for import
export default reducers;

