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
    questionsUpdated: Date.now(),
    questionsComplete:false,

    // fair use
    fairUse: 0,
    infringement: 0,
    resultInfringement: 0,
    resultText:{},

    // assessment info
    [strings.ASSESSMENT_INFO_IDS.FIRST_NAME]:'',
    [strings.ASSESSMENT_INFO_IDS.LAST_NAME]:'',
    [strings.ASSESSMENT_INFO_IDS.ORG_NAME]:'',

    // copyrighted content
    [strings.ASSESSMENT_INFO_IDS.URL_COPYRIGHTED]:'',
    [strings.ASSESSMENT_INFO_IDS.TITLE_COPYRIGHTED]:'COPYRIGHT TITLE',
    [strings.ASSESSMENT_INFO_IDS.FILETYPE_COPYRIGHTED]:'',

    // suspected content
    [strings.ASSESSMENT_INFO_IDS.URL_SUSPECTED]:'',
    [strings.ASSESSMENT_INFO_IDS.TITLE_SUSPECTED]:'SUSPECT TITLE',
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
                questions
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