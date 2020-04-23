import React, {useState, useEffect} from 'react'
import {createPlaylist, fetchAudioFeatures} from '../helpers/api-fetcher'
import './feelings.css'

// const select_songs_for_feeling(props){
//   console.log(props)


const Feeling = (props) => {
  const {userInfo, token, songUris} = props.state
  const [playlist, setPlaylist] = useState(0)
  console.log(userInfo.id, props)
  // const {sadClick} = props.sadClick
  // console.log(props.tracks)
  const useFetch = () => {
    const fetchData = async () => {
      let response = await fetchAudioFeatures(token, songUris)
      let results = await response.json();
      // let songList = [];
      let moods = {'angry': [], 'happy': [], 'sad':[]}
      for (let i = 0; i < results.length; i++){
        let mood = results[i].valence
        if(mood <= 0.33){
          moods['sad'] += songUris[i]
          console.log('sad song uris', songUris)
        } else if(mood > .33 && mood <= .66){
          moods['angry'] += songUris[i]
          console.log('angry song uris', songUris)
        } else {
          moods['happy'] += songUris[i]
          console.log('happy song uris', songUris)
        }
      }
      setPlaylist(moods)
    }
    // useEffect(()=> {
    //   console.log(playlist)
    //   fetchData();
    // })
    return [playlist]
  }
  
  return (
    <div >
      <div className='white f3'>
          {'Click your Mood!!!'}
      </div>
      <div className='center pa3'>
          <div className='form pa4 br3 shadow-5 ph3'>
            {/* <button className='w-33 grow no-underline f4 br-pill b bw2 ph3 pv2 mb2 dib white bg-orange'>HAPPY</button> */}
            <button className='w-33 grow no-underline f4 br-pill b bw2 ph3 pv2 mb2 dib white bg-yellow'>HAPPY</button>
            <button   className='w-33 grow no-underline f4 br-pill b bw2 ph3 pv2 mb2 dib white bg-light-blue' onClick={useFetch}>SAD</button>
            <button className='w-33 grow no-underline f4 br-pill b bw2 ph3 pv2 mb2 dib white bg-red'>ANGRY</button>
          </div>
      </div>
      <p className='f3'>
          {'This App will generate a playlist based on your mood'}
      </p>
    </div>
  );
}

export default Feeling