/**
 * ************************************
 *
 * @module  store.js
 * @author  smozingo
 * @date    11/12/17
 * @description Redux 'single source of truth'
 *
 * ************************************
 */

import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers/';

const store = createStore(
  reducers,
  composeWithDevTools()
);

export default store;