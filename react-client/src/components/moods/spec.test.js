import  React from 'react'
import {shallow} from 'enzyme'
import {findByTestAtr, checkProps} from './../../../Utils'
import Moods from './Moods'


const setUp = (props = {}) => {
    const component = shallow(<Moods {...props} />)
    return component
}

describe('Mood Component', () => {
    describe('checking proptypes', () => {
        it('should not throw a warning', () => {
            const expectedProps = {
                userName: 'test username',
                userId: 'test id',
                playlists:  ['temp', 'Array'],
                playlistPlaying: true,
                token:'12345678abcdefg',
                playing: false,
            }
            const propsErr = checkProps(Moods, expectedProps);
            expect(propsErr).toBeUndefined();
        })
    })
    describe('onPlaylistClick function', ()=>{
        const mockCallback = jest.fn(bool => !bool);
        mockCallback(true)
        expect(mockCallback.mock.calls.length).toBe(1);
        expect(mockCallback.mock.results[0].value).toBe(false);
    })

    describe('Have props', () => {
        let wrapper; 
        beforeEach(() => {
            const props = {
                userName: 'Test username',
                onPlaylistClick: 'Test function onPlaylistClick'
            }
            wrapper = setUp(props);
        })
        
        it('should render without errors', () => {
            const component = findByTestAtr(wrapper, 'MoodComponent');
            expect(component.length).toBe(1);
        });
        it('Should render an onClick function', () => {
            const onPlaylistClick = findByTestAtr(wrapper, 'onClickFunction'); 
            expect(onPlaylistClick.length).toBe(3)
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