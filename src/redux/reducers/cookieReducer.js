import { UPDATE_COOKIE_CLIENT } from '../actions/cookieActions';

export default function cookieReducer (state = [], action) {
    switch (action.type) {
    case UPDATE_COOKIE_CLIENT:
        return { ...state, header: action.payload };
    default:
        return state;
    }
}