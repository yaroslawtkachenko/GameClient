import {updateCookieClient} from './cookieActions';

export const UPDATE_HEADER = 'UPDATE_HEADER';

export function updateHeaderClient (header = {}) {
    return (dispatch) => {
        if (header['access-token'] && header['client'] && header['uid']) {
            header = {
                'access-token': header['access-token'],
                'client': header['client'],
                'uid': header['uid']
            };
            dispatch(updateCookieClient('auth-token', header));
            dispatch({ type: UPDATE_HEADER, payload: header });
        }
        return Promise.resolve();
    };
}
