import Adapter from 'enzyme-adapter-react-15';
import { configure } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import configureStore from '../../src/redux/configureStore';
import Header from '../../src/components/Header/Header';
import React from 'react';
import shallowWithStore from '../../__mocks__/shallowRenderWrapper';
// import sinon from 'sinon';
import thunk from 'redux-thunk';
import toJson from 'enzyme-to-json';

const store = configureStore({});
const mockStore = configureMockStore([thunk]);
configure({ adapter: new Adapter() });

describe('Header ', () => {
    describe('when signOut', () => {
        test('should render without crashing when unsignedIn', () => {
            const component = shallowWithStore(<Header isSignedIn={false}/>, store);
            expect(component).toMatchSnapshot();
        });
        test('should render itself with 0 a', () => {
            const component = shallowWithStore(<Header isSignedIn={false}/>, store);
            expect(component.dive().find('a').length).toEqual(0);
            expect(component.dive().find('strong').length).toEqual(1);
        });
    });

    describe('when signIn', () => {
        test('should render without crashing when signedIn', () => {
            const component = shallowWithStore(<Header isSignedIn={true}/>, store);
            expect(toJson(component)).toMatchSnapshot();
        });
        test('should render itself with 1 a', () => {
            const component = shallowWithStore(<Header isSignedIn={true}/>, store);
            expect(component.dive().find('a').length).toEqual(1);
            expect(component.dive().find('strong').length).toEqual(1);
        });
        // test('should invoke callback function ', () => {
        //     const component = shallowWithStore(<Header isSignedIn={true}/>, store);
        //     const spy = sinon.stub(component.dive().instance(), 'handleSignOutClick').returns(0);
        //     component.dive().find('a').at(0).simulate('click');
        //     expect(spy.called).toEqual(true);
        // });
    });
});
