import Adapter from 'enzyme-adapter-react-15';
import AddList from '../../src/components/ListsComponents/AddList/AddList';
import { configure } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import configureStore from '../../src/redux/configureStore';
import EditForm from '../../src/components/Forms/EditForm/EditForm';
import React from 'react';
import shallowWithStore from '../../__mocks__/shallowRenderWrapper';
// import sinon from 'sinon';
import thunk from 'redux-thunk';
// import toJson from 'enzyme-to-json';

const store = configureStore({});
const mockStore = configureMockStore([thunk]);
configure({ adapter: new Adapter() });

describe('AddList ', () => {
    test('should render without crashing when', () => {
        const component = shallowWithStore(<AddList />, store);
        expect(component).toMatchSnapshot();
    });
    test('should render EditForm', () => {
        const component = shallowWithStore(<AddList />, store);
        expect(component.dive().find('EditForm').length).toEqual(1);
    });
});