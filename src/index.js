import { applyMiddleware, createStore } from 'redux';
import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import combineReducers from './redux/reducers/combineReducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';

const store = createStore(combineReducers, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
