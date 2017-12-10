import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import App from '../../src/components/App/App';
import configureMockStore from 'redux-mock-store';
import configureStore from '../../src/redux/configureStore';
import {MemoryRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import shallowWithStore from '../../__mocks__/shallowRenderWrapper';
import SignIn from '../../src/components/User/SignIn';
import thunk from 'redux-thunk';

const store = configureStore({});
const mockStore = configureMockStore([thunk]);
configure({ adapter: new Adapter() });

describe('App ', () => {
    test('should render without crashing when unsignedIn', () => {
        const component = shallowWithStore(<App />, store);
        expect(component).toMatchSnapshot();
    });
    test('should render sign_in', () => {
        const store = configureStore({ user: {isSignedIn: false} });
        const component = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={[ '/sign_in' ]}>
                    <App/>
                </MemoryRouter>
            </Provider>
        );
        expect(component.find(SignIn)).toHaveLength(1);
    });
    test('should render header ', () => {
        const store = configureStore({ user: {isSignedIn: false} });
        const component = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={[ '/' ]}>
                    <App/>
                </MemoryRouter>
            </Provider>
        );
        expect(component.find('Header').length).toEqual(1);
    });
});