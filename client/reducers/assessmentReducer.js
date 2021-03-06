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
import testQuestions from '../services/testData';



const content = () =>
{
    return {
        [strings.ASSESSMENT_INFO_IDS.TITLE]: '',
        [strings.ASSESSMENT_INFO_IDS.VIDEO_ID]: '',
        [strings.ASSESSMENT_INFO_IDS.PUBLISHER]: '',
        [strings.ASSESSMENT_INFO_IDS.VIEW_COUNT]: '',
        [strings.ASSESSMENT_INFO_IDS.PUBLISH_DATE]: '',
        [strings.ASSESSMENT_INFO_IDS.URL]: '',
        [strings.ASSESSMENT_INFO_IDS.FILETYPE]: '',
    }
};


const initialState = {

    progress: 0,
    isHubOpen: true,
    startTimestamp: 0,

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
    resultInfringement: .25,
    resultText:null,
    resultMatrix:[],

    assessmentInfo: {
        // assessment info
        [strings.ASSESSMENT_INFO_IDS.FIRST_NAME]:'',
        [strings.ASSESSMENT_INFO_IDS.LAST_NAME]:'',
        [strings.ASSESSMENT_INFO_IDS.ORG_NAME]:'',

        [strings.ASSESSMENT_INFO_IDS.PRIMARY_CONTENT]: new content(),
        [strings.ASSESSMENT_INFO_IDS.SECONDARY_CONTENT]: new content(),

        [strings.ASSESSMENT_INFO_IDS.RESULTS_QUESTIONS]: {}
    }
};


let initQuestions;

const assessmentReducer = ( state = initialState, action ) =>
{

    let questions;
    let currentQuestionIndex;
    let currentQuestions;

    switch( action.type )
    {

        // going to grab questions from successful login here and add them to state
        case types.USER_LOGIN_SUCCESS:
            questions = getQuestions( action.payload.questions, false, null );
            initQuestions = JSON.stringify( questions );

            return {
                ...state,
                questions,
                currentQuestions:Object.values( questions )
            };

        // resets questions.
        case types.ASSESSMENT_START_OVER:
            questions = getQuestions( Object.values( JSON.parse( initQuestions )), false, null );
            currentQuestionIndex = 0;
            currentQuestions = getQuestionList( questions );

            return {
                ...state,
                questions,
                currentQuestions,
                currentQuestionIndex,
                questionsUpdated:Date.now(),
                progress:0,
            };

        case types.OPEN_CLOSE_CONTENTHUB:
            return {
                ...state,
                isHubOpen:!state.isHubOpen
            };

        // assessment start, hitting submit after user enters info.
        case types.ASSESSMENT_INFO_SUBMIT:
            return {
                ...state,
                startTimestamp:Date.now(),
                assessmentInfo:setContentInfo( action, state )
            };

        // assessment complete, hit submit button at bottom of questions.
        case types.ASSESSMENT_SUBMIT:
            return {
                ...state,
                ...getAssessmentData( state )
            };


        // update question count, update progress bar, get sub questions.
        case types.ASSESSMENT_UPDATE:

            currentQuestionIndex = state.currentQuestionIndex > action.payload.questionData.index+1 ? state.currentQuestionIndex : action.payload.questionData.index+1;
            questions = updateCurrentQuestion( Object.assign( {}, state.questions ), action.payload );

            currentQuestions = getQuestionList( questions );

            return {
                ...state,
                questions,
                currentQuestions,
                currentQuestionIndex,
                questionsUpdated:Date.now(),
                progress:currentQuestionIndex/(currentQuestions.length),
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
    let getList = list;
    let newQuestion = null;

    if( list && !list.length )
    {
        getList = Object.values( list );
    }

    if( getList )
    {
        getList.forEach(( item, index ) =>
        {
            newQuestion = Question( item, index, parentIndex, isSubQuestion );
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


const setContentInfo = ( action ) =>
{
    const { info, videoInfo } = action.payload;

    return {

        [strings.ASSESSMENT_INFO_IDS.FIRST_NAME]: info[strings.ASSESSMENT_INFO_IDS.FIRST_NAME],
        [strings.ASSESSMENT_INFO_IDS.LAST_NAME]: info[strings.ASSESSMENT_INFO_IDS.LAST_NAME],
        [strings.ASSESSMENT_INFO_IDS.ORG_NAME]: info[strings.ASSESSMENT_INFO_IDS.ORG_NAME],

        [strings.ASSESSMENT_INFO_IDS.PRIMARY_CONTENT]: setContentData( action.payload.primary[strings.ASSESSMENT_INFO_IDS.YOUTUBE_PRIMARY_VIDEO_ID], videoInfo, info, strings.ASSESSMENT_INFO_IDS.PRIMARY ),
        [strings.ASSESSMENT_INFO_IDS.SECONDARY_CONTENT]: setContentData( action.payload.secondary[strings.ASSESSMENT_INFO_IDS.YOUTUBE_SECONDARY_VIDEO_ID], videoInfo, info, strings.ASSESSMENT_INFO_IDS.SECONDARY ),
    };
};


const setContentData = ( id, videoInfo, info, contentType ) =>
{

    let url;
    let title;
    let item = null;
    let videoItem;

    const getFileNameFromURL = ( url ) =>
    {
        url = url.split('/').pop().replace(/\#(.*?)$/, '').replace(/\?(.*?)$/, '');
        url = url.split('.');

        return url[0] || 'n/a';
    };

    if( !id ) // non youtube content
    {
        url = info[strings.ASSESSMENT_INFO_IDS[`URL_${contentType}`]] || null;

        // if it had url try to pull title from file name.
        title = url ? getFileNameFromURL( url ) : info[strings.ASSESSMENT_INFO_IDS[`TITLE_${contentType}`]];

        return {
            [strings.ASSESSMENT_INFO_IDS.VIDEO_ID]: null,
            [strings.ASSESSMENT_INFO_IDS.FILETYPE]: info[strings.ASSESSMENT_INFO_IDS[`FILETYPE_${contentType}`]],
            [strings.ASSESSMENT_INFO_IDS.TITLE]: title,
            [strings.ASSESSMENT_INFO_IDS.PUBLISHER]: 'n/a',
            [strings.ASSESSMENT_INFO_IDS.VIEW_COUNT]: 'n/a',
            [strings.ASSESSMENT_INFO_IDS.PUBLISH_DATE]: 'n/a',
            [strings.ASSESSMENT_INFO_IDS.URL]: url || 'n/a',
        }
    }

    for( let i = 0; i < videoInfo.length; i++ )
    {
        videoItem = videoInfo[i];
        item = videoItem.items ? videoItem.items[0] : null;

        if( item && item.id === id )
        {
            return {
                [strings.ASSESSMENT_INFO_IDS.VIDEO_ID]: id,
                [strings.ASSESSMENT_INFO_IDS.FILETYPE]: 'typeVideo',
                [strings.ASSESSMENT_INFO_IDS.TITLE]: item.snippet.title,
                [strings.ASSESSMENT_INFO_IDS.PUBLISHER]: item.snippet.channelTitle,
                [strings.ASSESSMENT_INFO_IDS.VIEW_COUNT]: item.statistics.viewCount,
                [strings.ASSESSMENT_INFO_IDS.PUBLISH_DATE]: item.snippet.publishedAt,
                [strings.ASSESSMENT_INFO_IDS.URL]: `https://www.youtube.com/watch?v=${id}`,
            }
        }
    }

    return null;
};


// upon user submit of assessment, parses infringement value and result text.
const getAssessmentData = ( state ) =>
{
    let { currentQuestions } = state;

    if( testQuestions.TEST_FOR )
    {
        currentQuestions = getTestQuestions( state, testQuestions.TEST_FOR );
    }

    const resultData = {
        fairUse: 0,
        infringement: 0,
        resultInfringement: 0,
        resultText:{}
    };

    let response;

    let fairUse;
    let infringement;
    let maxPoints;
    let pointCounts = {};
    let questionID;

    currentQuestions.forEach(( question ) =>
    {
        response = question.isAnswered;
        questionID = parseInt(question.questionNumber);
        maxPoints = strings.QUESTION_MAX_POINTS[questionID];

        if( response !== 'unsure' )
        {
            fairUse = parseFloat( question[`${response}FairUse`] );
            infringement = parseFloat( question[`${response}Infringement`] );

            if( maxPoints )
            {
                if( !pointCounts[questionID] ) pointCounts[questionID] = { fairUse:0, infringement:0 };

                pointCounts[questionID].infringement += infringement;
                pointCounts[questionID].fairUse += fairUse;

                if( pointCounts[questionID].fairUse <= maxPoints )
                {
                    resultData.fairUse += fairUse;
                }

                if( pointCounts[questionID].infringement <= maxPoints )
                {
                    resultData.infringement += infringement;
                }
            }
            else
            {
                resultData.fairUse += fairUse;
                resultData.infringement += infringement;
            }
        }
    });

    const resultInfringement = resultData.infringement / ( resultData.fairUse + resultData.infringement );
    const resultText = getResultText( resultInfringement );
    const matrix = setMatrix( currentQuestions, resultText );

    resultData.resultInfringement = resultInfringement;
    resultData.resultText = resultText;
    resultData.resultMatrix = matrix;
    resultData.currentQuestions = currentQuestions;

    return resultData;
};


const getTestQuestions = ( state, resultType ) =>
{
    const { questions } = state;
    const resultQuestions = [];

    let question;
    let regKey;

    Object.keys( testQuestions[resultType] ).forEach(( key ) =>
    {
        regKey = key.match(/[a-z]+|[^a-z]+/gi);
        question = questions[regKey[0]];

        if( regKey.length > 1 )
        {
            question = question.subQuestions[`${regKey[0]}${regKey[1]}`];
        }

        question.isAnswered = testQuestions[resultType][key];

        resultQuestions.push(question)
    });

    return resultQuestions;
};


// goes through results question matrix, finds answered questions with same question number and answered
// value as matrix, then adds to list.
const setMatrix = ( questions, resultsText ) =>
{

    if( !questions || !resultsText ) return null;

    const matrix = resultsText.matrix;
    const resultMatrix = [];

    let question;
    let currentMatrix;

    for( let m = 0; m < matrix.length; m++ )
    {
        currentMatrix = matrix[m];

        for( let i = 0; i < questions.length; i++ )
        {
            question = questions[i];

            if( !question.questionNumber || !question.isAnswered ) continue;

            if( currentMatrix.num === question.questionNumber && question.isAnswered.toLowerCase().indexOf( currentMatrix.value.toLowerCase() ) === 0 )
            {
                resultMatrix.push( question );
            }
        }
    }

    return resultMatrix;
};


// gets the results text based on infringment value.
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

    return values[values.length-1];
};