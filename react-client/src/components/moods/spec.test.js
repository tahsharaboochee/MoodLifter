import  React from 'react'
import {shallow} from 'enzyme'
import {findByTestAtr} from './../../../Utils'

import Moods from './Moods'

const setUp = (props = {}) => {
    const component = shallow(<Moods {...props} />)
    return component
}

describe('Mood Component', () => {
    describe('Have props', () => {
        let wrapper; 
        beforeEach(() => {
            const props = {
                userName: 'Test username',
                // userId: 'Test id',
                // playlists: 'Test usersPlaylist an array',
                // playlistPlaying: 'Test boolean',
                // token:'Test token',
                // playing:'test boolean',
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