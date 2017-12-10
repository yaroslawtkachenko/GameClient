import {UPDATE_HEADER} from '../actions/headerActions';

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
    case UPDATE_HEADER:
        return {...state, ...action.payload};
    default:
        return state;
    }
}
