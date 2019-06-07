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
import * as screenActions from './screenActions';
import Services from '../services/services';


const submitAssessmentSuccess = ( result ) =>
({
    type: types.ASSESSMENT_UPDATE_SUCCESS,
    payload: result
});


const submitAssessmentError = ( result ) =>
({
    type: types.ASSESSMENT_UPDATE_ERROR,
    payload: result
});

export const submitAssessmentInfo = ( info ) =>
({
    type: types.ASSESSMENT_INFO_SUBMIT,
    payload: info
});


export const submitCompletedAssessment = ( data ) => dispatch =>
{
    Services.assessmentSubmitRoute( data,
        ( res ) => // on success
        {
            console.log( "ON SUCCESS IN ACTION: ", res );
            dispatch( submitAssessmentSuccess( res ) );
            dispatch( screenActions.nextScreen() );
        },
        ( res ) => // on error or unauthorized
        {
            console.log( "ON ERROR IN ACTION: ", res );
            dispatch(submitAssessmentError( res ))
        }
    );
};