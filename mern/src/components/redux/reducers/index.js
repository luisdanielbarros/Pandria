import userReducer from './userReducer';
import productsReducer from './productsReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    user: userReducer,
    products: productsReducer
});

export default allReducers;