import { applyMiddleware, createStore } from 'redux';
import combineReducers from './reducers/combineReducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export default function (initialState = {}) {
    return createStore(combineReducers, initialState, composeWithDevTools(applyMiddleware(thunk)));
}