import { combineReducers } from 'redux';
import headerReducer from './headerReducer';
import lists from './listReducer';
import tasks from './taskReducer';
import userReducer from './userReducer';

export default combineReducers({
    lists,
    tasks,
    header: headerReducer,
    user: userReducer
});
