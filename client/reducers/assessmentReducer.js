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

const initialState = {
    questions: [],
    currentQuestion:{},
    currentQuestionIndex: 0,
    totalQuestions: 0,
    firstName:'',
    lastName:'',
    orgName:'',
    copyrightContent:{ url:'', title:'', type:'' },
    suspectedContent:{ url:'', title:'', type:'' },
};


const assessmentReducer = ( state=initialState, action ) =>
{

    switch( action.type )
    {

        // going to grab questions from successful login here and add them to state
        case types.USER_LOGIN_SUCCESS:
            const questions = getQuestions( action.payload );
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
                ...state
            };

        // going to update question count, current fairuse value, update progress bar.
        case types.QUESTION_ANSWERED:
            return {
                ...state
            };

        default:
            return state;
    }
};

export default assessmentReducer;


const question = ( value ) =>
{
    return {
        question:'yes',
        branchOn: value.branchOn || '',
        noFairUse: value.noFairUse,
        noInfringement: value.noInfringement,
        questionNumber: value.questionNumber,
        questionText: value.questionText,
        subQuestions: getQuestions(value.subQuestions),
        yesFairUse: value.yesFairUse,
        yesInfringement: value.yesInfringement
    }
};

const getQuestions = ( list ) =>
{
    const questions = [];

    if( list )
    {
        list.forEach(( item ) =>
        {
            questions.push( new question( item ));
        })
    }

    return questions;
};