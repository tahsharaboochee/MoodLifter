import  React from 'react'
import {shallow} from 'enzyme'
import {findByTestAtr, checkProps} from './../../../Utils'
import Login from './Login'


const setUp = (props = {}) => {
    const component = shallow(<Login {...props} />)
    return component
}

describe('Login Component', () => {
    describe('checking proptypes', () => {
        it('should not throw a warning', () => {
            const expectedProps = {
                token:'12345678abcdefg',
            }
            const propsErr = checkProps(Login, expectedProps);
            expect(propsErr).toBeUndefined();
        })
    })

    describe('Have props', () => {
        let wrapper; 
        beforeEach(() => {
            const props = {
                token: 'Test token',
            }
            wrapper = setUp(props);
        })
        
        it('should render without errors', () => {
            const component = findByTestAtr(wrapper, 'loginComponent');
            expect(component.length).toBe(1);
        });f
    })
    describe('Have NO props', () => {
        let wrapper; 
        beforeEach(() => {
            wrapper = setUp();
        })
        it('should not render', () =>{
            const component = findByTestAtr(wrapper, 'props')
            expect(component.length).toBe(0)
        })
    })

})