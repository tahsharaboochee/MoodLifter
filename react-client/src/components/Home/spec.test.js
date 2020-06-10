import  React from 'react'
import {shallow} from 'enzyme'
import {findByTestAtr} from './../../../Utils'
import Home from './Home'

const setUp = (props = {}) => {
    const component = shallow(<Home {...props} />)
    return component
}

describe('Home Component', () => {
    let component; 
    beforeEach(() => {
        component = setUp();
    })
    it('should render without error site layout', () =>{
        const wrapper = findByTestAtr(component, 'site-layout')
        expect(wrapper.length).toBe(1)
    });
    
    it('should render hero', () =>{
        const wrapper = findByTestAtr(component, 'hero')
        expect(wrapper.length).toBe(1)
    });
    
    it('should render wave', () =>{
        const wrapper = component.find('.wave__thin');
        expect(wrapper.length).toBe(2)
    });

    // it('should render create personalised playlist'), () =>{
    //     const wrapper = component.find()
    // }

})