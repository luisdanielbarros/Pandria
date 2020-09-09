//User
export const SIGN_IN = 'SIGN_IN';
export const COOKIE_SIGN_IN = 'COOKIE_SIGN_IN';
export const LOG_OUT = 'LOG_OUT';
export const CHANGE_PROFILE = 'CHANGE_PROFILE';
export const CHANGE_THEME = 'CHANGE_THEME';
//Products
export const SELECT_GENRE = 'SELECT_GENRE';
export const SELECT_SUBGENRE = 'SELECT_SUBGENRE';
export const SEARCH_STRING = 'SEARCH_STRING';
export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export const SELECT_PRODUCT_FORMAT = 'SELECT_PRODUCT_FORMAT';
//View Modes
export const CHANGE_STORE_VIEW_MODE = 'CHANGE_STORE_VIEW_MODE';
export const CHANGE_CART_VIEW_MODE = 'CHANGE_CART_VIEW_MODE';
export const CHANGE_SHELF_VIEW_MODE = 'CHANGE_SHELF_VIEW_MODE';
//View Mode Scalings
export const CHANGE_DEFAULT_VIEW_SCALING = 'CHANGE_STORE_VIEW_SCALING';
export const CHANGE_SHELF_VIEW_SCALING = 'CHANGE_SHELF_VIEW_SCALING';
export const CHANGE_STACK_VIEW_SCALING = 'CHANGE_STACK_VIEW_SCALING';
export const CHANGE_SINGULAR_VIEW_SCALING = 'CHANGE_SINGULAR_VIEW_SCALING';


export const GET_VIEWMODE_ACTION = currViewMode => {
    switch(currViewMode) {
        case 'default':
            return CHANGE_DEFAULT_VIEW_SCALING;
        case 'shelf':
            return CHANGE_SHELF_VIEW_SCALING;
        case 'stack':
            return CHANGE_STACK_VIEW_SCALING;
        case 'singular':
            return CHANGE_SINGULAR_VIEW_SCALING;
        default:
            return CHANGE_DEFAULT_VIEW_SCALING;
    }
}