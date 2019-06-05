/**
 * ************************************
 *
 * @module  userReducer
 * @author  katzman
 * @date    06/02/19
 * @description handles all user states
 *
 * ************************************
 */

import * as types from '../constants/actionTypes';
import * as strings from '../constants/strings';


const initialState = {
    currentScreen: strings.SCREEN_LOGIN
};


const screenReducer = ( state=initialState, action ) =>
{

    console.log( "SCREEN REDUCER: ", action );

    switch( action.type )
    {
        case types.USER_LOGIN_SUCCESS:
            return {
                ...state,
                currentScreen:strings.SCREEN_DISCLAIMER
            };

        default:
            return state;
    }
};

export default screenReducer;