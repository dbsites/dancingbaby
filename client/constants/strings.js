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


export const SCREEN_LOGIN = 'SCREEN_LOGIN';
export const SCREEN_DISCLAIMER = 'SCREEN_DISCLAIMER';
export const SCREEN_ASSESSMENT_GETINFO = 'SCREEN_ASSESSMENT_GETINFO';
export const SCREEN_ASSESSMENT_QUESTIONS = 'SCREEN_ASSESSMENT_QUESTIONS';
export const SCREEN_ASSESSMENT_CALCULATING = 'SCREEN_ASSESSMENT_CALCULATING';
export const SCREEN_ASSESSMENT_RESULTS = 'SCREEN_ASSESSMENT_RESULTS';


export const SCREEN_LIST = [
    SCREEN_LOGIN,
    SCREEN_DISCLAIMER,
    SCREEN_ASSESSMENT_GETINFO,
    SCREEN_ASSESSMENT_QUESTIONS,
    // SCREEN_ASSESSMENT_CALCULATING,
    SCREEN_ASSESSMENT_RESULTS
];


export const ASSESSMENT_INFO_IDS = {

    FIRST_NAME:'FIRST_NAME',
    LAST_NAME:'LAST_NAME',
    ORG_NAME:'ORG_NAME',

    URL_COPYRIGHTED:'URL_COPYRIGHTED',
    TITLE_COPYRIGHTED:'TITLE_COPYRIGHTED',
    FILETYPE_COPYRIGHTED:'FILETYPE_COPYRIGHTED',

    URL_SUSPECTED:'URL_SUSPECTED',
    TITLE_SUSPECTED:'TITLE_SUSPECTED',
    FILETYPE_SUSPECTED:'FILETYPE_SUSPECTED',
};


export const ASSESSMENT_RESULTS_STRINGS = {
    VERY_STRONG:{ value:0, txt:'VERY STRONG', color:'veryStrongColor', legendClass:'veryStrong' },
    STRONG:{ value:.2, txt:'STRONG', color:'strongColor', legendClass:'strong' },
    MODERATE:{ value:.4, txt:'MODERATE', color:'moderateColor', legendClass:'moderate' },
    WEAK:{ value:.6, txt:'WEAK', color:'weakColor', legendClass:'weak' },
    NO_EVIDENCE:{ value:.8, txt:'No Evidence', color:'noEvidenceColor', legendClass:'noEvidence' },
};