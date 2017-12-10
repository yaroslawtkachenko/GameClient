import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import EditForm from '../../src/components/Forms/EditForm/EditForm';
import React from 'react';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });

describe('EditForm', () => {
    test('should render without crashing', () => {
        const component = mount(
            <EditForm
                defaultPlaceholder={'default test placeholder'}
                defaultValue={'default test value'}
                callbackConfirmClick={ () => {} }
                confirmButtonLabel={'confirm test label'}
                callbackCancelClick={ () => {} }
                cancelButtonLabel={'cancel test label'}
            />
        );
        expect(toJson(component)).toMatchSnapshot();
    });
    test('should render itself with 2 buttons', () => {
        const component = mount(
            <EditForm
                defaultPlaceholder={'default test placeholder'}
                defaultValue={'default test value'}
                callbackConfirmClick={ () => {} }
                confirmButtonLabel={'confirm test label'}
                callbackCancelClick={ () => {} }
                cancelButtonLabel={'cancel test label'}
            />
        );
        expect(component.find('input').length).toEqual(1);
        expect(component.find('button').length).toEqual(2);
    });
    test('should render self with 1 button', () => {
        const component = mount(
            <EditForm
                defaultPlaceholder={'default test placeholder'}
                defaultValue={'default test value'}
                callbackConfirmClick={ () => {} }
                confirmButtonLabel={'confirm test label'}
            />
        );
        expect(component.find('input').length).toEqual(1);
        expect(component.find('button').length).toEqual(1);
    });
    test('should call confirm callback', () => {
        const mockCallbackConfirmClick = jest.fn();
        const component = mount(
            <EditForm
                defaultValue={'default test value'}
                callbackConfirmClick={mockCallbackConfirmClick}
                confirmButtonLabel={'confirm test label'}
            />
        );
        const button = component.find('button').at(0);
        button.simulate('click');
        expect(mockCallbackConfirmClick).toHaveBeenCalledWith('default test value');
    });
    test('should not call confirm callback with empty value', () => {
        const mockCallbackConfirmClick = jest.fn();
        const component = mount(
            <EditForm
                defaultValue={''}
                callbackConfirmClick={mockCallbackConfirmClick}
                confirmButtonLabel={'confirm test label'}
            />
        );
        const button = component.find('button').at(0);
        button.simulate('click');
        expect(mockCallbackConfirmClick).not.toHaveBeenCalled();
    });
    test('should call cancel callback', () => {
        const mockCallbackCancelClick = jest.fn();
        const component = mount(
            <EditForm
                defaultValue={''}
                callbackConfirmClick={() => {
                }}
                confirmButtonLabel={'confirm test label'}
                callbackCancelClick={mockCallbackCancelClick}
            />
        );
        const button = component.find('button').at(1);
        button.simulate('click');
        expect(mockCallbackCancelClick).toHaveBeenCalled();
    });
});