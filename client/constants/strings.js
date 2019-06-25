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
    SCREEN_ASSESSMENT_CALCULATING,
    SCREEN_ASSESSMENT_RESULTS
];

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