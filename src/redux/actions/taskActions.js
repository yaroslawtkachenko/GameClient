import {CurrentVersion, TasksPath} from '../routes';
import axios from 'axios';
import {updateHeaderClient} from './headerActions';
import {Url} from '../urls';

export const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const CHANGE_TASK_STATE_SUCCESS = 'CHANGE_TASK_STATE_SUCCESS';
export const UP_TASK_POSITION_SUCCESS = 'UP_TASK_POSITION_SUCCESS';
export const DOWN_TASK_POSITION_SUCCESS = 'DOWN_TASK_POSITION_SUCCESS';

export function getTasks (listId) {
    return (dispatch, getState) => {
        return axios.get(Url + CurrentVersion + '/list_tasks/' + listId, {headers: getState().header})
            .then((response) => {
                if (response.status === 200) {
                    dispatch(updateHeaderClient(response.headers));
                    dispatch(getTasksSuccess(response.data, listId));
                    return Promise.resolve('success');
                }
            })
            .catch(() => {
                return Promise.resolve('error');
            });
    };
}

export function addTask (listId, content) {
    return (dispatch, getState) => {
        return axios.post(Url + CurrentVersion + '/' + TasksPath, {task: {list_id: listId, content: content}}, {headers: getState().header})
            .then((response) => {
                if (response.status === 201) {
                    dispatch(updateHeaderClient(response.headers));
                    dispatch(addTaskSuccess(response.data));
                    return Promise.resolve('success');
                }
            })
            .catch(() => {
                return Promise.resolve('error');
            });
    };
}

export function updateTask (task, content) {
    return (dispatch, getState) => {
        return axios.patch(Url + CurrentVersion + '/' + TasksPath + '/' + task.id, {task: {content: content}}, {headers: getState().header})
            .then((response) => {
                if (response.status === 200) {
                    dispatch(updateHeaderClient(response.headers));
                    dispatch(updateTaskSuccess(response.data));
                    return Promise.resolve('success');
                }
            })
            .catch(() => {
                return Promise.resolve('error');
            });
    };
}

export function deleteTask (task) {
    return (dispatch, getState) => {
        return axios.delete(Url + CurrentVersion + '/' + TasksPath + '/' + task.id, {headers: getState().header})
            .then((response) => {
                if (response.status === 200) {
                    dispatch(updateHeaderClient(response.headers));
                    dispatch(deleteTaskSuccess(response.data));
                    return Promise.resolve('success');
                }
            })
            .catch(() => {
                return Promise.resolve('error');
            });
    };
}

export function changeTaskState (task) {
    return (dispatch, getState) => {
        return axios.patch(Url + CurrentVersion + '/' + TasksPath + '/' + task.id + '/check', {}, {headers: getState().header})
            .then((response) => {
                if (response.status === 200) {
                    dispatch(updateHeaderClient(response.headers));
                    dispatch(changeTaskStateSuccess(response.data));
                    return Promise.resolve('success');
                }
            })
            .catch(() => {
                return Promise.resolve('error');
            });
    };
}

export function upTaskPosition (task) {
    return (dispatch, getState) => {
        return axios.patch(Url + CurrentVersion + '/' + TasksPath + '/' + task.id + '/up', {}, {headers: getState().header})
            .then((response) => {
                if (response.status === 200) {
                    dispatch(updateHeaderClient(response.headers));
                    dispatch(upTaskPositionSuccess(response.data, task.list_id));
                    return Promise.resolve('success');
                }
            })
            .catch(() => {
                return Promise.resolve('error');
            });
    };
}

export function downTaskPosition (task) {
    return (dispatch, getState) => {
        return axios.patch(Url + CurrentVersion + '/' + TasksPath + '/' + task.id + '/down', {}, {headers: getState().header})
            .then((response) => {
                if (response.status === 200) {
                    dispatch(updateHeaderClient(response.headers));
                    dispatch(downTaskPositionSuccess(response.data, task.list_id));
                    return Promise.resolve('success');
                }
            })
            .catch(() => {
                return Promise.resolve('error');
            });
    };
}

function getTasksSuccess (tasks, listId) {
    return { type: GET_TASKS_SUCCESS, payload: tasks, listId: listId };
}

function addTaskSuccess (task) {
    return { type: ADD_TASK_SUCCESS, payload: task };
}

function updateTaskSuccess (task) {
    return { type: UPDATE_TASK_SUCCESS, payload: task };
}

function deleteTaskSuccess (task) {
    return { type: DELETE_TASK_SUCCESS, payload: task };
}

function changeTaskStateSuccess (task) {
    return { type: CHANGE_TASK_STATE_SUCCESS, payload: task };
}

function upTaskPositionSuccess (tasks, listId) {
    return { type: UP_TASK_POSITION_SUCCESS, payload: tasks, listId: listId };
}

function downTaskPositionSuccess (tasks, listId) {
    return { type: DOWN_TASK_POSITION_SUCCESS, payload: tasks, listId: listId };
}
