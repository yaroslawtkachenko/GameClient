import {
    PENDING_VALIDATING_TOKEN,
    SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, SIGN_UP_SUCCESS, VALIDATION_TOKEN_ERROR,
    VALIDATION_TOKEN_SUCCESS, SIGN_OUT_ERROR
} from '../actions/userActions';

const initialState = { isSignedIn: false, isPending: false};

export default function userReducer (state = initialState, action) {
    switch (action.type) {
    case SIGN_IN_SUCCESS:
        return { isSignedIn: true, isPending: false };
    case SIGN_OUT_SUCCESS:
        return initialState;
    case SIGN_OUT_ERROR:
        return state;
    case SIGN_UP_SUCCESS:
        return { ...state, isSignedIn: true, isPending: false};
    case VALIDATION_TOKEN_SUCCESS:
        return { ...state, isSignedIn: true };
    case VALIDATION_TOKEN_ERROR:
        return initialState;
    case PENDING_VALIDATING_TOKEN:
        return { ...state, isPending: true};
    default:
        return state;
    }
}
