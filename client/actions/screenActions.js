/**
 * ************************************
 *
 * @module  screenActions
 * @author  katzman
 * @date    06/05/19
 * @description Screen Action Creators
 *
 * ************************************
 */


import * as types from '../constants/actionTypes';


export const nextScreen = () =>
({
    type: types.NEXT_SCREEN,
    payload: null
});



export const startOver = () =>
({
    type: types.ASSESSMENT_START_OVER,
    payload: null
});


export const showModal = ( modalData ) =>
({
    type: types.SHOW_MODAL,
    payload: modalData
});