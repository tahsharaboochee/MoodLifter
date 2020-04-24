import React, {useState, useEffect} from 'react'
import {createPlaylist} from '../helpers/api-fetcher'
import Feeling from './Feeling'

const CreatePlaylist = (props) => {
  // console.log(props)
  const [playlistId, setPlaylistId] = useState([])
  const {userId, playlists, token, sad} = props
  const playlist = ['Sad Music MoodLifter', 'Happy Music MoodLifter', 'Angry Music MoodLifter']
  useEffect(() => {
    //     If exist
    // const listOfPlaylist = Object.values(playlists)
    // playlists.forEach((x) => {
    //   let listNames = Object.keys(x)
    //    console.log(listNames, '\n', listNames.includes('example2'))

    // })
    playlist.forEach((list) => playlistInfo(list))
  })
 
  const playlistInfo = (playlistName) => {
    const listOfPlaylist = Object.values(playlists)
    // playlists.forEach((x) => console.log(x))
    for(let name of listOfPlaylist){
      let listNames = Object.keys(playlists)
      if(listOfPlaylist.includes(playlistName)){
        console.log('playlist exist')
      } else {
        console.log('playlist doesnt exist')
        // Create(post) the playlist sad, happy and angry 
        // Fetch the playlist 
        // To get playlist id 
        // Fetch post to add the song to playlist 
        // Fetch playlist by the id 
        // Play the list
  
      }
    }
  }
  return (
    <div >
     <Feeling playlist={'hey'}/>
    </div>
  );
}

export default CreatePlaylist