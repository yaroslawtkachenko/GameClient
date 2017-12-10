import Adapter from 'enzyme-adapter-react-15';
import AddTask from '../../src/components/TasksComponents/AddTask/AddTask';
import { configure } from 'enzyme';
import configureStore from '../../src/redux/configureStore';
import EditForm from '../../src/components/Forms/EditForm/EditForm';
import List from './../../src/components/ListsComponents/List/List';
import Lists from '../../src/components/ListsComponents/Lists/Lists';
import { Map } from 'immutable';
import React from 'react';
import shallowWithStore from '../../__mocks__/shallowRenderWrapper';
import Tasks from '../../src/components/TasksComponents/Tasks/Tasks';

configure({ adapter: new Adapter() });

const initialStateZeroLists = {lists: Map({})};
const initialStateOneList = { lists: Map({1: {id: '1', label: 'testList'}}) };
const initialStateTwoLists = { lists: Map({
    1: {id: '1', label: 'testList'},
    2: {id: '2', label: 'testList'} }) };

describe('Lists', () => {
    test('should render with without crashing', () => {
        const store = configureStore(initialStateOneList);
        const component = shallowWithStore(<Lists />, store);
        expect(component).toMatchSnapshot();
    });
    test('should render itself with list', () => {
        const store = configureStore(initialStateOneList);
        const component = shallowWithStore(<Lists/>, store);
        expect(component.prop('lists').size).toEqual(1);
        // expect(component.find(List).length).toEqual(1);
    });
    test('should render itself without lists', () => {
        const store = configureStore(initialStateZeroLists);
        const component = shallowWithStore(<Lists/>, store);
        expect(component.prop('lists').size).toEqual(0);
        // expect(component.find(List).length).toEqual(0);
    });
    test('should render itself with two lists', () => {
        const store = configureStore(initialStateTwoLists);
        const component = shallowWithStore(<Lists/>, store);
        expect(component.prop('lists').size).toEqual(2);
        expect(component.find(List)).toHaveLength(2);
    });
    // test('should invoke get tasks', () => {
    //     const store = configureStore(initialStateOneTask);
    //     const mockGetTasks = jest.fn();
    //     const component = shallowWithStore(<List list={testList} deleteList={() => {}} updateList={() => {}} getTasks={mockGetTasks}/>, store);
    //     expect(mockGetTasks).toHaveBeenCalled();
    // });
    // test('should invoke delete list', () => {
    //     const store = configureStore(initialStateOneTask);
    //     const mockDeleteList = jest.fn();
    //     const component = shallowWithStore(<List list={testList} deleteList={mockDeleteList} updateList={() => {}} getTasks={() => {}}/>, store);
    //     component.find('.button-delete').simulate('click');
    //     expect(mockDeleteList).toHaveBeenCalled();
    // });
});
