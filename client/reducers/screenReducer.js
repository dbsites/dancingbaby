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
    currentScreen: strings.SCREEN_LOGIN,
    currentScreenIndex: 0,
    showModal: false
};


const screenReducer = ( state=initialState, action ) =>
{

    switch( action.type )
    {
        case types.USER_LOGIN_SUCCESS:
        case types.USER_LOGIN_ERROR:
        case types.ASSESSMENT_SUBMIT:
        case types.ASSESSMENT_INFO_SUBMIT:
        case types.ASSESSMENT_UPDATE_SUCCESS:
        case types.NEXT_SCREEN:

            const newIndex = state.currentScreenIndex < strings.SCREEN_LIST.length -1 ? state.currentScreenIndex + 1 : strings.SCREEN_LIST.length -1;

            return {
                ...state,
                currentScreenIndex:newIndex,
                currentScreen: strings.SCREEN_LIST[newIndex]
            };

        case types.ASSESSMENT_START_OVER:
            return {
                ...state,
                currentScreenIndex:2,
                currentScreen: strings.SCREEN_LIST[2]
            };

        case types.SHOW_MODAL:
            return {
                ...state,
                showModal: action.payload
            };

        default:
            return state;
    }
};

export default screenReducer;