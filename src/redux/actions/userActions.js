import {AuthPath} from '../routes';
import axios from 'axios';
import Cookies from 'js-cookie';
import {updateHeaderClient} from './headerActions';
import {Url} from '../urls';

export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
export const VALIDATION_TOKEN_SUCCESS = 'VALIDATION_TOKEN_SUCCESS';
export const VALIDATION_TOKEN_ERROR = 'VALIDATION_TOKEN_ERROR';
export const PENDING_VALIDATING_TOKEN = 'PENDING_VALIDATING_TOKEN';
export const SIGN_OUT_ERROR = 'SIGN_OUT_ERROR';

export function signIn (email, password) {
    return (dispatch) => {
        dispatch(pendingValidateToken());
        return axios.post(Url + AuthPath + '/sign_in', {email: email, password: password})
            .then((response) => {
                if (response.status === 200) {
                    dispatch(updateHeaderClient(response.headers));
                    dispatch(signInSuccess());
                    return Promise.resolve('success');
                }
            })
            .catch(function (error) {
                return Promise.reject(error);
            });
    };
}

export function signUp (email, password, passwordConfirmation) {
    return (dispatch) => {
        dispatch(pendingValidateToken());
        return axios.post(Url + AuthPath, {
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
            confirm_success_url: ''
        }).then((response) => {
            if (response.status === 200) {
                dispatch(updateHeaderClient(response.headers));
                dispatch(signUpSuccess());
                return Promise.resolve('success');
            }
        }).catch(function (error) {
            return Promise.reject(error);
        });
    };
}

export function signOut () {
    return (dispatch, getState) => {
        return axios.delete(Url + AuthPath + '/sign_out', {headers: getState().header})
            .then((response) => {
                if (response.status === 200) {
                    Cookies.remove('auth_token');
                    dispatch(signOutSuccess());
                    return Promise.resolve(response);
                }
            })
            .catch(function (error) {
                dispatch({ type: SIGN_OUT_ERROR});
                return Promise.resolve(error);
            });
    };
}

export function validateToken () {
    return (dispatch) => {
        const headers = Cookies.getJSON('auth-token');
        dispatch(pendingValidateToken());
        if (headers) {
            dispatch(updateHeaderClient(headers));
            return axios.get(Url + AuthPath + '/validate_token', {headers: headers})
                .then((response) => {
                    if (response.status === 200 || response.status === 304) {
                        dispatch(updateHeaderClient(response.headers));
                        dispatch(signInSuccess());
                        return Promise.resolve('success');
                    }
                })
                .catch((error) => {
                    dispatch(validationTokenError(false));
                    return Promise.reject(error);
                });
        } else {
            dispatch(validationTokenError());
        }
    };
}

export function signInSuccess () {
    return { type: SIGN_IN_SUCCESS};
}

export function validationTokenSuccess (data) {
    return { type: VALIDATION_TOKEN_SUCCESS, payload: data };
}

export function validationTokenError (data) {
    return { type: VALIDATION_TOKEN_ERROR, payload: data };
}

export function signOutSuccess () {
    return { type: SIGN_OUT_SUCCESS };
}

export function signUpSuccess () {
    return { type: SIGN_UP_SUCCESS};
}

export function pendingValidateToken () {
    return { type: PENDING_VALIDATING_TOKEN};
}
