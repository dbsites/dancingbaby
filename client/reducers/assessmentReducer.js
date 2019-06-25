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


const initialState = {

    progress: 0,

    // questions
    questions: [],
    currentQuestion:{},
    currentQuestionIndex: 0,
    totalQuestions: 0,
    questionsComplete:false,

    // fair use
    noFairUse: 0,
    noInfringement: 0,
    yesFairUse: 0,
    yesInfringement: 0,

    // assessment info
    [strings.ASSESSMENT_INFO_IDS.FIRST_NAME]:'',
    [strings.ASSESSMENT_INFO_IDS.LAST_NAME]:'',
    [strings.ASSESSMENT_INFO_IDS.ORG_NAME]:'',

    // copyrighted content
    [strings.ASSESSMENT_INFO_IDS.URL_COPYRIGHTED]:'',
    [strings.ASSESSMENT_INFO_IDS.TITLE_COPYRIGHTED]:'',
    [strings.ASSESSMENT_INFO_IDS.FILETYPE_COPYRIGHTED]:'',

    // suspected content
    [strings.ASSESSMENT_INFO_IDS.URL_SUSPECTED]:'',
    [strings.ASSESSMENT_INFO_IDS.TITLE_SUSPECTED]:'',
    [strings.ASSESSMENT_INFO_IDS.FILETYPE_SUSPECTED]:'',
};


const assessmentReducer = ( state=initialState, action ) =>
{

    let questions;

    switch( action.type )
    {

        // going to grab questions from successful login here and add them to state
        case types.USER_LOGIN_SUCCESS:
            questions = getQuestions( action.payload );
            return {
                ...state,
                questions,
                totalQuestions:questions.length
            };

        case types.ASSESSMENT_INFO_SUBMIT:
            const info = action.payload;
            return {
                ...state,
                ...info
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
                ...state
            };

        // going to update question count, current fairuse value, update progress bar.
        case types.ASSESSMENT_UPDATE:
            // console.log( "ASSESSMENT_UPDATE: ", state.questions[action.payload.index], action.payload.response );

            const currentQuestionIndex = action.payload.index+1;
            const currentQuestion = state.questions[action.payload.index];

            currentQuestion.isAnswered = action.payload.response;

            questions = getSubquestions( state.questions, currentQuestion, action.payload );
            const fairUseValues = getFairuseValues( state, currentQuestion, action.payload.response );

            return {
                ...state,
                ...fairUseValues,
                questions,
                currentQuestionIndex,
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

const getFairuseValues = ( state, question, response ) =>
{
    if( response === 'unsure' ) return null;

    return {
        [`${response}FairUse`]:state[`${response}FairUse`] + parseFloat(question[`${response}FairUse`]),
        [`${response}Infringement`]:state[`${response}Infringement`] + parseFloat(question[`${response}Infringement`])
    }
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

        noFairUse: value.noFairUse,
        noInfringement: value.noInfringement,
        yesFairUse: value.yesFairUse,
        yesInfringement: value.yesInfringement
    }
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

/*
firstName(pin): '' => 'xcvbg'
lastName(pin): '' => 'sdfg'
orgName(pin): '' => 'asdf'
url_copyrighted(pin): 'sdf'
contentTitle_copyrighted(pin): 'sdf'
fileType_copyrighted(pin): '0000ff'
url_suspected(pin): 'sdfsdf'
contentTitle_suspected(pin): 'sdfsdfsdf'
fileType_suspected(pin): '00ff00'
 */

const getAssessmentInfo = ( info ) =>
{
    const infoObj = {

    };
};