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

    // questions
    questions: [],
    currentQuestion:{},
    currentQuestionIndex: 0,
    totalQuestions: 0,

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