/**
 * ************************************
 *
 * @module  userActions
 * @author  katzman
 * @date    06/05/19
 * @description User Action Creators
 *
 * ************************************
 */

import * as types from '../constants/actionTypes';
import Services from '../services/services';

const actions = {};



const userLoginSuccess = ( result ) =>
({
    type: types.USER_LOGIN_SUCCESS,
    payload: result
});


const userLoginError = ( result ) =>
({
    type: types.USER_LOGIN_ERROR,
    payload: result
});


const userLoginUnauthorized = ( result ) =>
({
    type: types.USER_LOGIN_UNAUTHORIZED,
    payload: result
});


actions.userLoginRoute = ( loginData ) => dispatch =>
{
    Services.userLoginRoute( loginData,
        ( res ) => // on success
        {
            console.log( "ON SUCCESS IN ACTION: ", res );
            dispatch( userLoginSuccess( res ) );
        },
        ( res ) => // on error or unauthorized
        {
            console.log( "ON ERROR IN ACTION: ", res );
            dispatch(userLoginError( res ))
        }
    );
};


export default actions;