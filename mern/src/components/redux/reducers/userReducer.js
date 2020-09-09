import { SIGN_IN, COOKIE_SIGN_IN, LOG_OUT, CHANGE_PROFILE, CHANGE_THEME } from '../actions';
const initialState = {
    theme: 'default'
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN:
        case COOKIE_SIGN_IN:
                return action.payload;
        case LOG_OUT:
            return initialState;
        case CHANGE_PROFILE:
            let obj = Object.entries(state).reduce((o, key) => ({ ...o, [key[0]]: key[1]}));
            Object.keys(action.payload).forEach(prop => obj[prop] = action.payload[prop]);
            return obj;
        case CHANGE_THEME:
            let newState = Object.assign({}, state);
            newState.theme = action.payload;
            return newState;
        default:
            return state;
    }
}

export default userReducer;