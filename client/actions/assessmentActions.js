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
import * as strings from '../constants/strings';
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


const submitAssessmentInfo = ( info ) =>
({
    type: types.ASSESSMENT_INFO_SUBMIT,
    payload: info
});


export const downloadReport = () =>
({
    type: types.ASSESSMENT_DOWNLOAD_REPORT,
    payload: null
});


export const startOver = () =>
({
    type: types.ASSESSMENT_START_OVER,
    payload: null
});

export const updateAssessment = ( question ) =>
({
    type: types.ASSESSMENT_UPDATE,
    payload: question
});

export const setAssessmentInfo = ( info ) => ( dispatch ) =>
{
    const suspectId = getYTVideoId( info[strings.ASSESSMENT_INFO_IDS.URL_SUSPECTED] );
    const copyrightId = getYTVideoId( info[strings.ASSESSMENT_INFO_IDS.URL_COPYRIGHTED] );


    const copyrightVideoInfo = new Promise(( resolve, reject ) =>
    {
        getYoutubeVideoInfo( copyrightId, strings.ASSESSMENT_INFO_IDS.URL_COPYRIGHTED, resolve );
    });

    const suspectVideoInfo = new Promise(( resolve, reject ) =>
    {
        getYoutubeVideoInfo( suspectId, strings.ASSESSMENT_INFO_IDS.URL_SUSPECTED, resolve );
    });

    Promise.all( [copyrightVideoInfo, suspectVideoInfo] ).then(( result ) =>
    {
        console.log( "SET ASSESSMENT INFO: ", copyrightId, suspectId, result );

        // this will show the results screen.
        dispatch( screenActions.nextScreen() );
        dispatch( submitAssessmentInfo({ info, youtubeVideo:result }));
    });

    // this will show the loading screen.
    // dispatch( screenActions.nextScreen() );
};


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


const getYTVideoId = ( path ) =>
{
    let id = '';

    const url = path.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

    if( url[2] !== undefined )
    {
        id = url[2].split(/[^0-9a-z_\-]/i);
        id = id[0];
    }
    else
    {
        id = null;
    }

    return id;
};


const getYoutubeVideoInfo = ( videoId, videoType, resolve ) =>
{

    Services.getYoutubeVideoInfo( videoId,
        ( res ) => // on success
        {
            console.log( "ON SUCCESS IN YOUTUBE ACTION: ", res.title, videoType );
            resolve({ res, type:videoType });
        },
        ( error ) => // on error or unauthorized
        {
            console.log( "ON ERROR IN ACTION: ", error );
            resolve({ error, type:videoType });
        }
    );
};