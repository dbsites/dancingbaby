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
    questions: {},
    currentQuestions: [],
    currentQuestion: {},
    currentQuestionIndex: 0,
    totalQuestions: 0,
    questionsUpdated: 'init',
    questionsComplete: false,

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

        [strings.ASSESSMENT_INFO_IDS.COPYRIGHTED_CONTENT]: new content(),
        [strings.ASSESSMENT_INFO_IDS.SUSPECTED_CONTENT]: new content()
    }
};


let initQuestions;

const assessmentReducer = ( state = initialState, action ) =>
{

    let questions;
    let result;

    switch( action.type )
    {

        // going to grab questions from successful login here and add them to state
        case types.USER_LOGIN_SUCCESS:
            questions = getQuestions( action.payload, false, null );
            initQuestions = JSON.stringify( questions );

            return {
                ...state,
                questions,
                currentQuestions:Object.values( questions )
            };

        case types.OPEN_CLOSE_CONTENTHUB:
            return {
                ...state,
                isHubOpen:!state.isHubOpen
            };

        case types.ASSESSMENT_INFO_SUBMIT:

            console.log( ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ASSESSMENT INFO SUBMIT: ", action );

            return {
                ...state,
                assessmentInfo:setVideoInfo( action, state )
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
        case types.ASSESSMENT_UPDATE:

            const currentQuestionIndex = action.payload.questionData.index+1;
            questions = updateCurrentQuestion( Object.assign( {}, state.questions ), action.payload );

            const currentQuestions = getQuestionList( questions );

            return {
                ...state,
                questions,
                currentQuestions,
                currentQuestionIndex,
                questionsUpdated:Date.now(),
                progress:action.payload.index/(state.questions.length-1),
            };

        default:
            return state;
    }
};

export default assessmentReducer;


const updateCurrentQuestion = ( questions, payload ) =>
{

    const { parentIndex, number } = payload.questionData;
    const parentQuestion = Object.assign( {}, questions[parentIndex] );

    let subQuestion;

    if( parentIndex === number )
    {
        parentQuestion.isAnswered = payload.response;
        parentQuestion.showSubQuestions = parentQuestion.branchOn && parentQuestion.branchOn.toLowerCase() === payload.response.toLowerCase() && parentQuestion.subQuestions;
        questions[parentIndex] = parentQuestion;
    }
    else
    {
        subQuestion = Object.assign( {}, parentQuestion.subQuestions[number] );
        subQuestion.isAnswered = payload.response;

        parentQuestion.subQuestions[number] = subQuestion;
        questions[parentIndex] = parentQuestion;
    }

    return questions;
};

const getSubquestions = ( subQuestions ) =>
{
    const resultList = [];

    if( !subQuestions || !Object.keys( subQuestions ).length ) return [];

    Object.values( subQuestions ).forEach(( item ) =>
    {
        resultList.push( item );
    });

    return resultList;
};


/**
 * takes in array of question objects and returns an object using the question numbers as the key.
 * @param list Array
 * @param isSubQuestion Boolean
 * @param parentIndex String - the question number, can be int or int with text
 */
const getQuestions = ( list, isSubQuestion, parentIndex ) =>
{
    const questions = {};
    let newQuestion = null;

    if( list )
    {
        list.forEach(( item, index ) =>
        {
            newQuestion = new Question( item, index, parentIndex, isSubQuestion );
            questions[newQuestion.questionNumber] = newQuestion;
        })
    }

    return questions;
};


const getQuestionList = ( questions ) =>
{
    let questionItem;
    let results = [];

    Object.keys( questions ).forEach(( key ) =>
    {
        questionItem = questions[key];
        results.push( questionItem );

        if( questionItem.showSubQuestions )
        {
            results = results.concat( getSubquestions( questionItem.subQuestions ));
        }
    });

    return results;
};


const Question = ( value, index, parentIndex, isSubQuestion = false ) =>
{
    return {
        isAnswered:false,
        isSubQuestion,
        index,
        parentIndex: parentIndex || value.questionNumber,

        branchOn: value.branchOn || '',
        questionNumber: value.questionNumber,
        questionText: value.questionText,
        subQuestions: value.subQuestions ? getQuestions( value.subQuestions, true, value.questionNumber ) : null,
        showSubQuestions: false,

        noFairUse: parseFloat( value.noFairUse ),
        noInfringement: parseFloat( value.noInfringement ),
        yesFairUse: parseFloat( value.yesFairUse ),
        yesInfringement: parseFloat( value.yesInfringement ),
    }
};


const setVideoInfo = ( action, state ) =>
{
    const { info, videoInfo } = action.payload;
    const result = {

        [strings.ASSESSMENT_INFO_IDS.FIRST_NAME]: info[strings.ASSESSMENT_INFO_IDS.FIRST_NAME],
        [strings.ASSESSMENT_INFO_IDS.LAST_NAME]: info[strings.ASSESSMENT_INFO_IDS.LAST_NAME],
        [strings.ASSESSMENT_INFO_IDS.ORG_NAME]: info[strings.ASSESSMENT_INFO_IDS.ORG_NAME],

        [strings.ASSESSMENT_INFO_IDS.COPYRIGHTED_CONTENT]: setVideoData( action.payload[strings.ASSESSMENT_INFO_IDS.YOUTUBE_COPYRIGHTED_VIDEO_ID], videoInfo, info ),
        [strings.ASSESSMENT_INFO_IDS.SUSPECTED_CONTENT]: setVideoData( action.payload[strings.ASSESSMENT_INFO_IDS.YOUTUBE_SUSPECTED_VIDEO_ID], videoInfo, info ),
    };

    console.log( ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> GET VIDEO INFO INFO: ", info, videoInfo, result );

    return result;
};


const setVideoData = ( id, videoInfo, info ) =>
{
    console.log( ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> SET VIDEO DATA: ", id, videoInfo, info );

    let result = null;
    let item = null;

    videoInfo.forEach(( videoItem ) =>
    {
        item = videoItem.items ? videoItem.items[0] : null;
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> SET VIDEO INFO: ", item, videoItem );

        if( item && item.id === id )
        {

            result = getYoutubeVideoData( id, item );
        }

        if( !item && !id )
        {
            result = getVideoData( info, videoItem )
        }


    });

    return result;
};


const getYoutubeVideoData = ( id, item ) =>
{
    return {
        [strings.ASSESSMENT_INFO_IDS.VIDEO_ID]: id,
        [strings.ASSESSMENT_INFO_IDS.VIDEO_TITLE]: item.snippet.title,
        [strings.ASSESSMENT_INFO_IDS.VIDEO_PUBLISHER]: item.snippet.channelTitle,
        [strings.ASSESSMENT_INFO_IDS.VIDEO_VIEW_COUNT]: item.statistics.viewCount,
        [strings.ASSESSMENT_INFO_IDS.VIDEO_PUBLISH_DATE]: item.snippet.publishedAt,
        [strings.ASSESSMENT_INFO_IDS.VIDEO_URL]: `https://www.youtube.com/watch?v=${id}`,
    }
};

const getVideoData = ( info, videoItem ) =>
{
    console.log( ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> GET VIDEO DATA: ", info, videoItem );

    return null;

    return {
        [strings.ASSESSMENT_INFO_IDS.VIDEO_ID]: null,
        [strings.ASSESSMENT_INFO_IDS.VIDEO_TITLE]: info[strings.ASSESSMENT_INFO_IDS.VIDEO_TITLE],
        [strings.ASSESSMENT_INFO_IDS.VIDEO_PUBLISHER]: null,
        [strings.ASSESSMENT_INFO_IDS.VIDEO_VIEW_COUNT]: null,
        [strings.ASSESSMENT_INFO_IDS.VIDEO_PUBLISH_DATE]: null,
        [strings.ASSESSMENT_INFO_IDS.VIDEO_URL]: info[strings.ASSESSMENT_INFO_IDS.VIDEO_URL],
    }
};


const getAssessmentData = ( questions ) =>
{
    console.log( "GET ASSESSMENT DATA: ", questions );

    let resultData = {
        fairUse: 0,
        infringement: 0,
        resultInfringement: 0,
        resultText:{}
    };

    let response;

    Object.values( questions ).forEach(( question ) =>
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