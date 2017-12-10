import {CurrentVersion, ListsPath} from '../routes';
import axios from 'axios';
import {updateHeaderClient} from './headerActions';
import {Url} from '../urls';

export const GET_LISTS_SUCCESS = 'GET_LISTS_SUCCESS';
export const ADD_LIST_SUCCESS = 'ADD_LIST_SUCCESS';
export const UPDATE_LIST_SUCCESS = 'UPDATE_LIST_SUCCESS';
export const DELETE_LIST_SUCCESS = 'DELETE_LIST_SUCCESS';

export function getLists () {
    return (dispatch, getState) => {
        return axios.get(Url + CurrentVersion + '/' + ListsPath, { headers: getState().header })
            .then((response) => {
                if (response.status === 200) {
                    dispatch(updateHeaderClient(response.headers));
                    dispatch(getListsSuccess(response.data));
                    return Promise.resolve('success');
                }
            })
            .catch(() => {
                return Promise.resolve('error');
            });
    };
}

export function addList (label) {
    return (dispatch, getState) => {
        return axios.post(Url + CurrentVersion + '/' + ListsPath, {list: { label: label }}, {headers: getState().header})
            .then((response) => {
                if (response.status === 201) {
                    dispatch(updateHeaderClient(response.headers));
                    dispatch(addListSuccess(response.data));
                    return Promise.resolve('success');
                }
            })
            .catch(() => {
                return Promise.resolve('error');
            });
    };
}

export function updateList (listId, label) {
    return (dispatch, getState) => {
        return axios.patch(Url + CurrentVersion + '/' + ListsPath + '/' + listId, {list: {label: label}}, {headers: getState().header})
            .then((response) => {
                if (response.status === 200) {
                    dispatch(updateHeaderClient(response.headers));
                    dispatch(updateListSuccess(response.data));
                    return Promise.resolve('success');
                }
            })
            .catch(() => {
                return Promise.resolve('error');
            });
    };
}

export function deleteList (listId) {
    return (dispatch, getState) => {
        return axios.delete(Url + CurrentVersion + '/' + ListsPath + '/' + listId, {headers: getState().header})
            .then((response) => {
                if (response.status === 200) {
                    dispatch(updateHeaderClient(response.headers));
                    dispatch(deleteListSuccess(response.data));
                    return Promise.resolve('success');
                }
            })
            .catch(() => {
                return Promise.resolve('error');
            });
    };
}

function getListsSuccess (lists) {
    return { type: GET_LISTS_SUCCESS, payload: lists };
}

function addListSuccess (list) {
    return { type: ADD_LIST_SUCCESS, payload: list };
}

function updateListSuccess (list) {
    return { type: UPDATE_LIST_SUCCESS, payload: list };
}

function deleteListSuccess (list) {
    return { type: DELETE_LIST_SUCCESS, payload: list };
}
