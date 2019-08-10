/**
 * ************************************
 *
 * @module  strings
 * @author katzman
 * @date    06/04/2019
 * @description
 *
 * ************************************
 */


export const SCREEN_LOGIN = { screen:'SCREEN_LOGIN', showLoading:false };
export const SCREEN_DISCLAIMER = { screen:'SCREEN_DISCLAIMER', showLoading:true, loadingMessage:'LOGGING IN' };
export const SCREEN_ASSESSMENT_GETINFO = { screen:'SCREEN_ASSESSMENT_GETINFO', showLoading:false };
export const SCREEN_ASSESSMENT_QUESTIONS = { screen:'SCREEN_ASSESSMENT_QUESTIONS', showLoading:false };
export const SCREEN_ASSESSMENT_RESULTS = { screen:'SCREEN_ASSESSMENT_RESULTS', showLoading:true, loadingMessage:'CALCULATING' };


export const SCREEN_LIST = [
    SCREEN_LOGIN,
    SCREEN_DISCLAIMER,
    SCREEN_ASSESSMENT_GETINFO,
    SCREEN_ASSESSMENT_QUESTIONS,
    SCREEN_ASSESSMENT_RESULTS
];


export const ASSESSMENT_INFO_IDS = {

    FIRST_NAME:'FIRST_NAME',
    LAST_NAME:'LAST_NAME',
    ORG_NAME:'ORG_NAME',

    PRIMARY:'PRIMARY',
    SECONDARY:'SECONDARY',

    PRIMARY_CONTENT:'PRIMARY_CONTENT',
    SECONDARY_CONTENT:'SECONDARY_CONTENT',

    URL:'URL',
    TITLE:'TITLE',
    FILETYPE:'FILETYPE',
    PUBLISHER:'PUBLISHER',
    VIEW_COUNT:'VIEW_COUNT',
    PUBLISH_DATE:'PUBLISH_DATE',

    VIDEO_TITLE:'VIDEO_TITLE',
    VIDEO_ID:'VIDEO_ID',
    VIDEO_PUBLISHER:'VIDEO_PUBLISHER',
    VIDEO_VIEW_COUNT:'VIDEO_VIEW_COUNT',
    VIDEO_PUBLISH_DATE:'VIDEO_PUBLISH_DATE',
    VIDEO_URL:'VIDEO_URL',

    RESULTS_QUESTIONS:'RESULTS_QUESTIONS',

    URL_PRIMARY:'URL_PRIMARY',
    TITLE_PRIMARY:'TITLE_PRIMARY',
    FILETYPE_PRIMARY:'FILETYPE_PRIMARY',

    URL_SECONDARY:'URL_SECONDARY',
    TITLE_SECONDARY:'TITLE_SECONDARY',
    FILETYPE_SECONDARY:'FILETYPE_SECONDARY',

    YOUTUBE_SECONDARY_VIDEO_ID:'YOUTUBE_SECONDARY_VIDEO_ID',
    YOUTUBE_PRIMARY_VIDEO_ID:'YOUTUBE_PRIMARY_VIDEO_ID',
};


// we have one question that has two subquestions but only allows a max of 2 points rather then 3.
// the key is the question number, value is the max points, it's applied to fairuse or infringement.
export const QUESTION_MAX_POINTS = {
    '10':2
};


export const ASSESSMENT_RESULTS_STRINGS = {
    VERY_STRONG:{
        value:0,
        txt:'VERY STRONG',
        color:'veryStrongColor',
        legendClass:'veryStrong',
        matrix:[
            { num:'8',  value:'Y' },
            { num:'9',  value:'Y' },
            { num:'7',  value:'Y' },
            { num:'3',  value:'Y' },
            { num:'16', value:'Y' },
            { num:'18', value:'N' },
            { num:'4',  value:'Y' },
            { num:'9a', value:'Y' },
            { num:'9d', value:'Y' },
            { num:'10', value:'N' },
            { num:'13', value:'Y' }
        ]
    },
    STRONG:{
        value:.2,
        txt:'STRONG',
        color:'strongColor',
        legendClass:'strong',
        matrix:[
            { num:'8',  value:'Y' },
            { num:'9',  value:'Y' },
            { num:'7',  value:'Y' },
            { num:'3',  value:'Y' },
            { num:'16', value:'Y' },
            { num:'18', value:'N' },
            { num:'4',  value:'Y' },
            { num:'9a', value:'Y' },
            { num:'9d', value:'Y' },
            { num:'10', value:'N' },
            { num:'13', value:'Y' }
        ]
    },
    MODERATE:{
        value:.4,
        txt:'MODERATE',
        color:'moderateColor',
        legendClass:'moderate',
        matrix:[
            { num:'8',  value:'Y' },
            { num:'9',  value:'Y' },
            { num:'7',  value:'Y' },
            { num:'3',  value:'Y' },
            { num:'16', value:'Y' },
            { num:'18', value:'N' },
            { num:'4',  value:'Y' },
            { num:'9a', value:'Y' },
            { num:'9d', value:'Y' },
            { num:'10', value:'N' },
            { num:'13', value:'Y' }
        ]
    },
    WEAK:{
        value:.6,
        txt:'WEAK',
        color:'weakColor',
        legendClass:'weak',
        matrix:[
            { num:'18', value:'Y' },
            { num:'9b', value:'Y' },
            { num:'9c', value:'N' },
            { num:'5',  value:'Y' },
            { num:'17', value:'Y' },
            { num:'15', value:'Y' },
            { num:'11', value:'N' },
            { num:'12', value:'Y' },
            { num:'19', value:'Y' },
            { num:'20', value:'Y' },
            { num:'14', value:'N' }
        ]
    },
    NO_EVIDENCE:{
        value:.8,
        txt:'No Evidence',
        color:'noEvidenceColor',
        legendClass:'noEvidence',
        matrix:[
            { num:'8',  value:'Y' },
            { num:'9',  value:'Y' },
            { num:'7',  value:'Y' },
            { num:'3',  value:'Y' },
            { num:'16', value:'Y' },
            { num:'18', value:'N' },
            { num:'4',  value:'Y' },
            { num:'9a', value:'Y' },
            { num:'9d', value:'Y' },
            { num:'10', value:'N' },
            { num:'13', value:'Y' }
        ]
    },
};
