import { createStore, applyMiddleware } from 'redux';
import allReducers from './reducers';
import thunk from 'redux-thunk';

const initialState = {};

const middleWare = [thunk];

const store = createStore(allReducers, initialState, applyMiddleware(...middleWare));

store.subscribe(() => console.log("Store changed!", store.getState()));

export default store;