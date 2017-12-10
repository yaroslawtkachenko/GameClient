import Adapter from 'enzyme-adapter-react-15';
import AddTask from '../../src/components/TasksComponents/AddTask/AddTask';
import { configure } from 'enzyme';
import configureStore from '../../src/redux/configureStore';
import EditForm from '../../src/components/Forms/EditForm/EditForm';
import List from '../../src/components/ListsComponents/List/List';
import { Map } from 'immutable';
import React from 'react';
import shallowWithStore from '../../__mocks__/shallowRenderWrapper';
import Tasks from '../../src/components/TasksComponents/Tasks/Tasks';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });

const initialStateZeroTasks = {tasks: Map({})};
const initialStateOneTask = { tasks: Map({1: Map({ 1: {id: '1', content: 'testTask', position: '1', is_done: false} })}) };
const initialStateTwoTasks = { tasks: Map({1: Map({
    1: {id: '1', content: 'testTask', position: '1', is_done: false, list_id: 1},
    2: {id: '2', content: 'testTask', position: '2', is_done: false, list_id: 1} })}) };
const testList = {id: '1', label: 'testList'};

describe('List', () => {
    test('should render with without crashing', () => {
        const store = configureStore(initialStateZeroTasks);
        const component = shallowWithStore(<List list={testList} deleteList={() => {}} updateList={() => {}} getTasks={() => {}}/>, store);
        expect(component).toMatchSnapshot();
    });
    test('should render itself with header', () => {
        const store = configureStore(initialStateOneTask);
        const component = shallowWithStore(<List list={testList} deleteList={() => {}} updateList={() => {}} getTasks={() => {}}/>, store);
        expect(component.find('.list-header').length).toEqual(1);
        expect(component.find('.left-area').length).toEqual(1);
        expect(component.find('.right-area').length).toEqual(1);
    });
    test('should render itself with tasks', () => {
        const store = configureStore(initialStateOneTask);
        const component = shallowWithStore(<List list={testList} deleteList={() => {}} updateList={() => {}} getTasks={() => {}}/>, store);
        component.find('.left-area').simulate('click');
        expect(component.find('.list-header').length).toEqual(1);
        expect(component.find('.list-tasks').length).toEqual(1);
        expect(component.find(AddTask).length).toEqual(1);
        expect(component.find(Tasks).length).toEqual(1);
    });
    test('should render itself with edit form', () => {
        const store = configureStore(initialStateOneTask);
        const component = shallowWithStore(<List list={testList} deleteList={() => {}} updateList={() => {}} getTasks={() => {}}/>, store);
        component.find('.button-update').simulate('click');
        expect(component.find(EditForm).length).toEqual(1);
    });
    test('should invoke get tasks', () => {
        const store = configureStore(initialStateOneTask);
        const mockGetTasks = jest.fn();
        const component = shallowWithStore(<List list={testList} deleteList={() => {}} updateList={() => {}} getTasks={mockGetTasks}/>, store);
        expect(mockGetTasks).toHaveBeenCalled();
    });
    test('should invoke delete list', () => {
        const store = configureStore(initialStateOneTask);
        const mockDeleteList = jest.fn();
        const component = shallowWithStore(<List list={testList} deleteList={mockDeleteList} updateList={() => {}} getTasks={() => {}}/>, store);
        component.find('.button-delete').simulate('click');
        expect(mockDeleteList).toHaveBeenCalled();
    });
});
