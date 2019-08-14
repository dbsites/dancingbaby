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
};


export const setAssessmentInfo = ( info ) => ( dispatch ) =>
{
    const results = {
        info,
        secondary:{},
        primary:{},
        videoInfo:[]
    };

    setContenInfo( info, results, dispatch )
};


export const submitCompletedAssessment = () => ( dispatch, getState ) =>
{
    const { assessment, user } = getState();
    const { assessmentInfo, currentQuestions } = assessment;

    const primaryContent = assessmentInfo[strings.ASSESSMENT_INFO_IDS.PRIMARY_CONTENT];
    const secondaryContent = assessmentInfo[strings.ASSESSMENT_INFO_IDS.SECONDARY_CONTENT];

    const primaryPublishDate = primaryContent[strings.ASSESSMENT_INFO_IDS.PUBLISH_DATE] === 'n/a' ? null : primaryContent[strings.ASSESSMENT_INFO_IDS.PUBLISH_DATE];
    const secondaryPublishDate = secondaryContent[strings.ASSESSMENT_INFO_IDS.PUBLISH_DATE] === 'n/a' ? null : secondaryContent[strings.ASSESSMENT_INFO_IDS.PUBLISH_DATE];

    console.log( "SUBMIT COMPLETED ASSESSMENT: ", getState(), assessment, user );

    const submitData = {
        session: {
            firstName: assessmentInfo[strings.ASSESSMENT_INFO_IDS.FIRST_NAME],
            lastName: assessmentInfo[strings.ASSESSMENT_INFO_IDS.LAST_NAME],
            accountId: user.accountId,
            organization: assessmentInfo[strings.ASSESSMENT_INFO_IDS.ORG_NAME],
            primary: {
                fileType: primaryContent[strings.ASSESSMENT_INFO_IDS.FILETYPE],
                url: primaryContent[strings.ASSESSMENT_INFO_IDS.URL],
                author: primaryContent[strings.ASSESSMENT_INFO_IDS.PUBLISHER],
                publishedDate: primaryPublishDate,
                viewCount: primaryContent[strings.ASSESSMENT_INFO_IDS.VIEW_COUNT],
            },
            secondary: {
                fileType: secondaryContent[strings.ASSESSMENT_INFO_IDS.FILETYPE],
                url: secondaryContent[strings.ASSESSMENT_INFO_IDS.URL],
                author: secondaryContent[strings.ASSESSMENT_INFO_IDS.PUBLISHER],
                publishedDate: secondaryPublishDate,
                viewCount: secondaryContent[strings.ASSESSMENT_INFO_IDS.VIEW_COUNT],
            },
            factorsAgainst: assessment.infringement,
            factorsToward: assessment.fairUse,
            startTimestamp: assessment.startTimestamp,
            completedTimestamp: Date.now(),
            assessment: currentQuestions.map((question) => {
                return {question_number: question.questionNumber, answer: question.isAnswered}
            })
        }
    };

    console.log( "SUBMIT COMPLETED ASSESSMENT: ", submitData );

    Services.assessmentSubmitRoute( submitData,
        ( res ) => // on success
        {
            console.log( "ON SUCCESS IN ACTION: ", res );
            dispatch( submitAssessmentSuccess( res ));
        },
        ( res ) => // on error or unauthorized
        {
            console.log( "ON ERROR IN ACTION: ", res );
            dispatch( submitAssessmentError( res ))
        }
    );
};


const getYTVideoId = ( path ) =>
{
    if( !path ) return null;

    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = path.match(regExp);

    if( match && match[7].length === 11 )
    {
        return match[7];
    }
    else
    {
        return null;
    }
};


const setContenInfo = ( info, results, dispatch ) =>
{
    // Youtube video data
    const videoIds = [];
    const secondaryId = getYTVideoId( info[strings.ASSESSMENT_INFO_IDS.URL_SECONDARY] );
    const primaryId = getYTVideoId( info[strings.ASSESSMENT_INFO_IDS.URL_PRIMARY] );

    const secondary = results.secondary;
    const primary = results.primary;

    let videoInfo = {};

    if( secondaryId )
    {
        secondary[strings.ASSESSMENT_INFO_IDS.YOUTUBE_SECONDARY_VIDEO_ID] = secondaryId;
        videoIds.push( secondaryId );
    }

    if( primaryId )
    {
        primary[strings.ASSESSMENT_INFO_IDS.YOUTUBE_PRIMARY_VIDEO_ID] = primaryId;
        videoIds.push( primaryId );
    }

    if( !videoIds.length )
    {
        dispatch( submitAssessmentInfo( results ));
    }
    else
    {
        if( videoIds.length === 1 )
        {
            // videoInfo = { videoType:'html' };
            results.videoInfo.push( videoInfo );
        }

        Services.getYoutubeVideoInfo( videoIds,
            ( res ) =>
            {
                if( res )
                {
                    res.forEach(( item ) =>
                    {
                        videoInfo = JSON.parse( item );
                        videoInfo.videoType = 'yt';

                        results.videoInfo.push( videoInfo );
                    });

                    dispatch( submitAssessmentInfo( results ));
                }

                console.log( "ON SUCCESS IN YOUTUBE ACTION: ", results.videoInfo );
            },
            ( res ) =>
            {
                console.log( "ON ERROR IN ACTION: ", res );
            }
        );
    }
};