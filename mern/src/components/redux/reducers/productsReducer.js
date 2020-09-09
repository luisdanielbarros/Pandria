import { SELECT_GENRE, SELECT_SUBGENRE, SEARCH_STRING, LOAD_PRODUCTS, SELECT_PRODUCT_FORMAT,
    CHANGE_STORE_VIEW_MODE, CHANGE_CART_VIEW_MODE, CHANGE_SHELF_VIEW_MODE,
    CHANGE_DEFAULT_VIEW_SCALING, CHANGE_SHELF_VIEW_SCALING, CHANGE_STACK_VIEW_SCALING, CHANGE_SINGULAR_VIEW_SCALING } from '../actions';


    /*
    Important: Each view mode (default, shelf, stack, singular) has a scaling value (0-100). View mode's scaling values are universal,
    a shelf view mode's scaling value will be shared across two different components rendering products in shelf view. If one of the
    components were to alter its scaling value, all other components rendering in shelf view mode would have their scaling value altered.*/

    const initialState = {
    genre: ``,
    subgenre: ``,
    search_string: ``,
    views: {
        default: {
            scaling: 50,
        },
        shelf: {
            scaling: 50,
        },
        stack: {
            scaling: 50,
        },
        singular: {
            scaling: 50,
        },
    },
    store_view_mode: 'default',
    cart_view_mode: 'default',
    shelf_view_mode: 'default',
    products_loaded: [],
    product: {
        format: 'Format',
        price: 0.00
    }
};

const productsReducer = (state = initialState, action) => {
    let newState = Object.assign({}, state);
    switch (action.type) {
        //Genre
        case SELECT_GENRE:
            newState.genre = action.payload;
            return newState;
        //Subgenre
        case SELECT_SUBGENRE:
            newState.subgenre = action.payload;
            return newState;
        //Search string
        case SEARCH_STRING:
            newState.search_string = action.payload;
            return newState;
        //Loaded Products
        case LOAD_PRODUCTS:
            newState.loaded_products = action.payload;
            return newState;
        //Selected Products
        case SELECT_PRODUCT_FORMAT:
            newState.product.format = action.payload;
            return newState;
        //Views
        ////Default
        case CHANGE_DEFAULT_VIEW_SCALING:
            newState.views.default.scaling = action.payload;
            return newState;
        ////Shelf
        case CHANGE_SHELF_VIEW_SCALING:
            newState.views.shelf.scaling = action.payload;
            return newState;
        ////Stack
        case CHANGE_STACK_VIEW_SCALING:
            newState.views.stack.scaling = action.payload;
            return newState;
        ////Singular
        case CHANGE_SINGULAR_VIEW_SCALING:
            newState.views.singular.scaling = action.payload;
            return newState;
        //View Modes
        ////Store
        case CHANGE_STORE_VIEW_MODE:
            newState.store_view_mode = action.payload;
            return newState;
        ////Cart
        case CHANGE_CART_VIEW_MODE:
            newState.cart_view_mode = action.payload;
            return newState;
        ////Shelf
        case CHANGE_SHELF_VIEW_MODE:
            newState.shelf_view_mode = action.payload;
            return newState;
        default:
            return state;
    }
}

export default productsReducer;