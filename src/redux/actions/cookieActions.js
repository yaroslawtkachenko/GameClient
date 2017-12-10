import Cookies from 'js-cookie';
const UPDATE_COOKIE_CLIENT = 'UPDATE_COOKIE_CLIENT';

export function updateCookieClient (name, data) {
    Cookies.set(name, JSON.stringify(data));
    return { type: UPDATE_COOKIE_CLIENT, payload: name};
}
