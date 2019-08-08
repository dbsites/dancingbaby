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

const initialState = {
    userLoggedIn: false,
    username:'',
    accountId:''
};


const userReducer = ( state=initialState, action ) =>
{

    switch( action.type )
    {
        case types.USER_LOGIN_UNAUTHORIZED:
            return {
                ...state
            };

        case types.USER_LOGIN_ERROR:
            return {
                ...state
            };

        case types.USER_LOGIN_SUCCESS:
            return {
                ...state,
                accountId:action.payload.accountId
            };

        default:
            return state;
    }
};

export default userReducer;