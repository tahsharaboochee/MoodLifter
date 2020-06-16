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
        });
        it('Test click event', () => {
            const testState = { width: 10, height: 20 };
            // const wrapper = shallow((
            //   <Login
            //     width={testState.width}
            //     height={testState.height}
            //     onChange={(e) => {
            //       testState[e.target.name] = e.target.value;
            //     }}
            //   />
            // ));
            console.log(wrapper.find('button'), wrapper.find('a').at(0).prop('value'))
            expect(wrapper.find('a').at(0).prop('value')).toEqual(10);
            expect(wrapper.find('a').at(1).prop('value')).toEqual(20);
            wrapper.find('a').at(0).simulate('change', { target: { name: 'width', value: 50 } });
            wrapper.find('a').at(1).simulate('change', { target: { name: 'height', value: 70 } });
            expect(testState.width).toEqual(50);
            expect(testState.height).toEqual(70);
            
        
        })
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