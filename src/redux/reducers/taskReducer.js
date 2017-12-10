import '../actions/taskActions';
import {
    GET_TASKS_SUCCESS, ADD_TASK_SUCCESS, UPDATE_TASK_SUCCESS, DELETE_TASK_SUCCESS,
    CHANGE_TASK_STATE_SUCCESS, UP_TASK_POSITION_SUCCESS, DOWN_TASK_POSITION_SUCCESS
} from '../actions/taskActions';
import { Map } from 'immutable';
import {SIGN_OUT_SUCCESS} from '../actions/userActions';

const initialState = Map({});

export default function taskReducer (state = initialState, action) {
    switch (action.type) {
    case GET_TASKS_SUCCESS:
        return setTasksMap(state, action.payload, action.listId);
    case ADD_TASK_SUCCESS:
        return state.setIn([action.payload.list_id, action.payload.id], action.payload);
    case UPDATE_TASK_SUCCESS:
        return state.setIn([action.payload.list_id, action.payload.id], action.payload);
    case DELETE_TASK_SUCCESS:
        return state.deleteIn([action.payload.list_id, action.payload.id]);
    case CHANGE_TASK_STATE_SUCCESS:
        return state.setIn([action.payload.list_id, action.payload.id], action.payload);
    case UP_TASK_POSITION_SUCCESS:
        return setTasksMap(state, action.payload, action.listId);
    case DOWN_TASK_POSITION_SUCCESS:
        return setTasksMap(state, action.payload, action.listId);
    case SIGN_OUT_SUCCESS:
        return initialState;
    default:
        return state;
    }
}

function setTasksMap (state, tasks, listId) {
    let tasksMap = new Map();
    tasks.forEach(task => {
        tasksMap = tasksMap.set(task.id, task);
    });
    return state.set(listId, tasksMap);
}
