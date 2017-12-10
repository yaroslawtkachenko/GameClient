import Adapter from 'enzyme-adapter-react-15';
import { configure } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import configureStore from '../../src/redux/configureStore';
// import React from 'react';
import {signOut} from '../../src/redux/actions/userActions';
import thunk from 'redux-thunk';

const realStore = configureStore({});
const mockStore = configureMockStore([thunk]);
configure({ adapter: new Adapter() });

describe('User Actions tests', () => {
    test('should call confirm callback', () => {
        const store = mockStore({ header: realStore.getState().header });
        const expectedActions = 'SIGN_OUT_ERROR';
        return store.dispatch(signOut()).then(() => {
            expect(store.getActions()[0].type).toEqual(expectedActions);
        });
    });
});
