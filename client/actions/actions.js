/**
 * ************************************
 *
 * @module  actions.js
 * @author  smozingo
 * @date    11/13/17
 * @description Action Creators
 *
 * ************************************
 */

import * as types from '../constants/actionTypes'


export const createMarket = (market) => ({
     type: types.ADD_MARKET,
     payload: market,
});

export const addCard = (marketId) => ({
  type: types.ADD_CARD,
  payload: marketId,
});

export const deleteCard = (marketId) => ({
  type: types.DELETE_CARD,
  payload: marketId,
});

export const setNewLocation = (location) => ({
  type: types.SET_NEW_LOCATION,
  payload: location,
});