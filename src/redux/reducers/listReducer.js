import '../actions/listActions';
import {GET_LISTS_SUCCESS, ADD_LIST_SUCCESS, UPDATE_LIST_SUCCESS, DELETE_LIST_SUCCESS} from '../actions/listActions';
import { Map } from 'immutable';
import {SIGN_OUT_SUCCESS} from '../actions/userActions';

const initialState = Map({});

export default function listReducer (state = initialState, action) {
    switch (action.type) {
    case GET_LISTS_SUCCESS:
        return setListsMap(state, action.payload);
    case ADD_LIST_SUCCESS:
        return state.set(action.payload.id, action.payload);
    case UPDATE_LIST_SUCCESS:
        return state.set(action.payload.id, action.payload);
    case DELETE_LIST_SUCCESS:
        return state.delete(action.payload.id);
    case SIGN_OUT_SUCCESS:
        return initialState;
    default:
        return state;
    }
}

function setListsMap (state, lists) {
    lists.forEach(list => {
        state = state.set(list.id, list);
    });
    return state;
}
