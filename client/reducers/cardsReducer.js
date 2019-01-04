/**
 * ************************************
 *
 * @module  cardsReducer
 * @author  smozingo
 * @date    11/13/17
 * @description reducer for loyalty card data
 *
 * ************************************
 */

import * as types from '../constants/actionTypes';

const initialState = {
  marketList: [],
  lastMarketId: 10000,
  newLocation: '',
  totalCards: 0,
  totalMarkets: 0,
};

const cardsReducer = (state=initialState, action) => {
  let marketList;
  console.log('crState', state);

  switch(action.type) {
    case types.ADD_MARKET:
      // increment counters
      let lastMarketId = state.lastMarketId + 1;
      let totalMarkets = state.totalMarkets + 1;

      // create the new market from provided data
      const newMarket = {
        location: state.newLocation,
        marketId: lastMarketId,
        cards: 0,
      };

      // push the new market on the market list
      marketList = state.marketList;
      marketList.push(newMarket);

      // return updated state
      return {
        ...state,
        marketList,
        lastMarketId,
        totalMarkets,
        newLocation: '',
      };

    case types.SET_NEW_LOCATION:
      return {
        ...state,
        newLocation: action.payload,
      };

    case types.ADD_CARD:
      marketList = state.marketList.slice();
      totalCards = state.totalCards;
      for(let i = 0; i < marketList.length; i++) {
        if(marketList[i].marketId == action.payload) {
          marketList[i].cards++;
          totalCards++;
          break;
        }
      }

      return {
        ...state,
        marketList,
        totalCards,
      };

    case types.DELETE_CARD:
      marketList = state.marketList.slice();
      let totalCards = state.totalCards;
      for(let i = 0; i < marketList.length; i++) {
        if(marketList[i].marketId == action.payload && marketList[i].cards > 0) {
          marketList[i].cards--;
          totalCards--;
          break;
        }
      }
      return {
        ...state,
        marketList,
        totalCards,
      };

    default:
      return state;
  }
};

export default cardsReducer;