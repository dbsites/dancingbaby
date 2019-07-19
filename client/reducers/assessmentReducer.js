/**
 * ************************************
 *
 * @module  assessmentReducer
 * @author  katzman
 * @date    06/02/19
 * @description handles all assessment/question states
 *
 * ************************************
 */

import * as types from '../constants/actionTypes';
import * as strings from '../constants/strings';



const content = () =>
{
    return {
        [strings.ASSESSMENT_INFO_IDS.VIDEO_TITLE]: '',
        [strings.ASSESSMENT_INFO_IDS.VIDEO_ID]: '',
        [strings.ASSESSMENT_INFO_IDS.VIDEO_PUBLISHER]: '',
        [strings.ASSESSMENT_INFO_IDS.VIDEO_VIEW_COUNT]: '',
        [strings.ASSESSMENT_INFO_IDS.VIDEO_PUBLISH_DATE]: '',
        [strings.ASSESSMENT_INFO_IDS.VIDEO_URL]: '',
        [strings.ASSESSMENT_INFO_IDS.FILETYPE]: '',
    }
};


const initialState = {

    progress: 0,
    isHubOpen: true,

    // questions
    questions: [],
    currentQuestion:{},
    currentQuestionIndex: 0,
    totalQuestions: 0,
    questionsUpdated: 'init',
    questionsComplete:false,

    // fair use
    fairUse: 0,
    infringement: 0,
    resultInfringement: .5,
    resultText:strings.ASSESSMENT_RESULTS_STRINGS[1],

    assessmentInfo: {
        // assessment info
        [strings.ASSESSMENT_INFO_IDS.FIRST_NAME]:'',
        [strings.ASSESSMENT_INFO_IDS.LAST_NAME]:'',
        [strings.ASSESSMENT_INFO_IDS.ORG_NAME]:'',

        [strings.ASSESSMENT_INFO_IDS.COPYRIGHTED_CONTENT]: content(),
        [strings.ASSESSMENT_INFO_IDS.SUSPECTED_CONTENT]: content()
    }
};


const assessmentReducer = ( state=initialState, action ) =>
{

    let questions;
    let result;

    switch( action.type )
    {

        // going to grab questions from successful login here and add them to state
        case types.USER_LOGIN_SUCCESS:
            questions = getQuestions( action.payload );
            return {
                ...state,
                questions
            };

        case types.OPEN_CLOSE_CONTENTHUB:
            return {
                ...state,
                isHubOpen:!state.isHubOpen
            };

        case types.ASSESSMENT_INFO_SUBMIT:
            return {
                ...state,
                assessmentInfo:getYoutubeVideoInfo( action, state )
            };

        case types.ASSESSMENT_START:
            return {
                ...state
            };

        case types.ASSESSMENT_RESULTS:
            return {
                ...state
            };

        case types.ASSESSMENT_SUBMIT:
            return {
                ...state,
                ...getAssessmentData( state.questions )
            };


        // update question count, update progress bar, get sub questions.
        // TODO: fix bug where sub questions stay if user changes selection on parent question.
        case types.ASSESSMENT_UPDATE:
            const currentQuestionIndex = action.payload.index+1;
            const currentQuestion = state.questions[action.payload.index];

            currentQuestion.isAnswered = action.payload.response;
            questions = getSubquestions( state.questions, currentQuestion, action.payload );

            return {
                ...state,
                questions,
                currentQuestionIndex,
                questionsUpdated:Date.now(),
                progress:action.payload.index/(state.questions.length-1),
            };

        default:
            return state;
    }
};

export default assessmentReducer;


const getSubquestions = ( questions, question, payload ) =>
{
    if( !question.branchOn || question.branchOn.toLowerCase() !== payload.response.toLowerCase() || !question.subQuestions ) return questions;

    const subQuestions = getQuestions( question.subQuestions, true );
    const updateQuestions = [].concat( questions );

    updateQuestions.splice( payload.index+1, 0, ...subQuestions );

    return updateQuestions;
};


const question = ( value, isSubQuestion = false ) =>
{
    return {
        isAnswered:false,
        isSubQuestion,

        branchOn: value.branchOn || '',
        questionNumber: value.questionNumber,
        questionText: value.questionText,
        subQuestions: getQuestions(value.subQuestions),

        noFairUse: parseFloat( value.noFairUse ),
        noInfringement: parseFloat( value.noInfringement ),
        yesFairUse: parseFloat( value.yesFairUse ),
        yesInfringement: parseFloat( value.yesInfringement )
    }
};


const getYoutubeVideoInfo = ( action, state ) =>
{
    console.log( "GETTING YOUTUBE VIDEO INFO: ", action.payload );

    const { info, videoInfo } = action.payload;
    const result = {

        [strings.ASSESSMENT_INFO_IDS.FIRST_NAME]: info[strings.ASSESSMENT_INFO_IDS.FIRST_NAME],
        [strings.ASSESSMENT_INFO_IDS.LAST_NAME]: info[strings.ASSESSMENT_INFO_IDS.LAST_NAME],
        [strings.ASSESSMENT_INFO_IDS.ORG_NAME]: info[strings.ASSESSMENT_INFO_IDS.ORG_NAME],

        [strings.ASSESSMENT_INFO_IDS.COPYRIGHTED_CONTENT]: setVideoData( action.payload[strings.ASSESSMENT_INFO_IDS.YOUTUBE_COPYRIGHTED_VIDEO_ID], videoInfo ),
        [strings.ASSESSMENT_INFO_IDS.SUSPECTED_CONTENT]: setVideoData( action.payload[strings.ASSESSMENT_INFO_IDS.YOUTUBE_SUSPECTED_VIDEO_ID], videoInfo ),
    };

    return result;
};


const setVideoData = ( id, videoInfo ) =>
{
    console.log( "SET VIDEO DATA: ", id, videoInfo );

    let result = null;
    let item = null;

    videoInfo.forEach(( info ) =>
    {
        item = info.items[0];

        if( item && item.id === id )
        {
            console.log("SET VIDEO INFO: ", item );

            result = {
                [strings.ASSESSMENT_INFO_IDS.VIDEO_ID]: id,
                [strings.ASSESSMENT_INFO_IDS.VIDEO_TITLE]: item.snippet.title,
                [strings.ASSESSMENT_INFO_IDS.VIDEO_PUBLISHER]: item.snippet.channelTitle,
                [strings.ASSESSMENT_INFO_IDS.VIDEO_VIEW_COUNT]: item.statistics.viewCount,
                [strings.ASSESSMENT_INFO_IDS.VIDEO_PUBLISH_DATE]: item.snippet.publishedAt,
                [strings.ASSESSMENT_INFO_IDS.VIDEO_URL]: `https://www.youtube.com/watch?v=${id}`,
            }
        }
    });

    return result;
};


const getQuestions = ( list, isSubQuestion ) =>
{
    const questions = [];

    if( list )
    {
        list.forEach(( item ) =>
        {
            questions.push( new question( item, isSubQuestion ));
        })
    }

    return questions;
};


const getAssessmentData = ( questions ) =>
{
    let resultData = {
        fairUse: 0,
        infringement: 0,
        resultInfringement: 0,
        resultText:{}
    };

    let response;

    questions.forEach(( question ) =>
    {
        response = question.isAnswered;

        if( response !== 'unsure' )
        {
            resultData.fairUse += parseFloat( question[`${response}FairUse`] );
            resultData.infringement += parseFloat( question[`${response}Infringement`] );
        }
    });

    resultData.resultInfringement = resultData.infringement / ( resultData.fairUse + resultData.infringement );
    resultData.resultText = getResultText( resultData.resultInfringement );

    return resultData;
};


const getResultText = ( resultValue ) =>
{
    const values = Object.values( strings.ASSESSMENT_RESULTS_STRINGS );

    for( let i = 0; i < values.length; i++ )
    {
        if( values[i].value > resultValue )
        {
            return values[i-1];
        }
    }
};