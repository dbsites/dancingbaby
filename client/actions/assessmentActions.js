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

export const openCloseContentHub = () =>
({
    type: types.OPEN_CLOSE_CONTENTHUB,
    payload: null
});

export const submitAssessment = () =>
({
    type: types.ASSESSMENT_SUBMIT,
    payload: null
});


export const submitAssessmentQuestions = () => ( dispatch ) =>
{
    dispatch( submitAssessment() );
    dispatch( screenActions.nextScreen() );
};


export const setAssessmentInfo = ( info ) => ( dispatch ) =>
{

    const suspectId = getYTVideoId( info[strings.ASSESSMENT_INFO_IDS.URL_SUSPECTED] );
    const copyrightId = getYTVideoId( info[strings.ASSESSMENT_INFO_IDS.URL_COPYRIGHT] );
    const results = {
        [strings.ASSESSMENT_INFO_IDS.YOUTUBE_COPYRIGHTED_VIDEO_ID]:copyrightId,
        [strings.ASSESSMENT_INFO_IDS.YOUTUBE_SUSPECTED_VIDEO_ID]:suspectId,
        info,
        videoInfo:[]
    };

    Services.getYoutubeVideoInfo( [suspectId, copyrightId],
        ( res ) => // on success
        {
            if( res )
            {
                res.forEach(( item ) =>
                {
                    results.videoInfo.push( JSON.parse( item ));
                });

                dispatch( submitAssessmentInfo( results ));
                dispatch( screenActions.nextScreen() );
            }

            console.log( "ON SUCCESS IN YOUTUBE ACTION: ", results.videoInfo );
        },
        ( res ) => // on error or unauthorized
        {
            console.log( "ON ERROR IN ACTION: ", res );
        }
    );
};


export const submitCompletedAssessment = ( data ) => dispatch =>
{
    // Services.assessmentSubmitRoute( data,
    //     ( res ) => // on success
    //     {
    //         console.log( "ON SUCCESS IN ACTION: ", res );
    //         dispatch( submitAssessmentSuccess( res ) );
    //         dispatch( screenActions.nextScreen() );
    //     },
    //     ( res ) => // on error or unauthorized
    //     {
    //         console.log( "ON ERROR IN ACTION: ", res );
    //         dispatch(submitAssessmentError( res ))
    //     }
    // );
};


const getYTVideoId = ( path ) =>
{
    let id = '';

    if( !path ) return null;

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

    // if( !videoId )
    // {
    //     resolve({ res:null, type:videoType });
    //     return null;
    // }
    //
    // Services.getYoutubeVideoInfo( videoId,
    //     ( res ) => // on success
    //     {
    //         console.log( "ON SUCCESS IN YOUTUBE ACTION: ", res.title, videoType );
    //         resolve({ res, type:videoType });
    //     },
    //     ( error ) => // on error or unauthorized
    //     {
    //         console.log( "ON ERROR IN ACTION: ", error );
    //         resolve({ error, type:videoType });
    //     }
    // );
};