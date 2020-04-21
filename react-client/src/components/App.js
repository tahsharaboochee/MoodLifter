import React, {Component} from 'react';
import Header from './header/Header'
import Logo from './logo/Logo'
import Feeling from './moods/Feeling'
import {transferPlaybackToMoodLifter, usersTopArtistsOrSongs, fetchUser} from './helpers/api-fetcher'
import './App.css'

// A Spotify URI is a link that you can find in the Share menu of any track, album, or artist page on Spotify. When a user clicks a link that consists of a Spotify URI (rather than an URL/HTTP address), they're taken directly to the Spotify application, without having to go through the web page first.
// import logo from './logo.svg';

class App extends Component {
  constructor(props) {
    super(props);
    //set the initial state
    this.state = {
      refresh_token: null,
      token: null,
      usersTopArtists: [],
      usersTopSongs: [],
      deviceId: '',
      loggedIn: false, 
      songName: 'track Name',
      artistName: 'Artist Name',
      playing: false, 
      position: 0,
      duration: 0,
      backgroundImage: ''
    };
    //repeatedly check to see if SDK is ready
    this.spotifyPlayerCheckInterval = null; 
  }
  
  //when we sign into spotify
  componentDidMount() {
    // Set token
    const queryString = window.location.search
    //parse the query string's parameters
    const urlParams = new URLSearchParams(queryString)
    const access_token = urlParams.get('access_token')
    const refresh_token = urlParams.get('refresh_token')
    // console.log('we have a token', access_token, '\nrefresh token', refresh_token)
    if (access_token) {
      // Set token, loggedIn variable
      this.setState({
        token: access_token,
        refresh_token: refresh_token,
        loggedIn: true
      });
    
    //user info
    // fetchUser(access_token).then((userInfo) => console.log(userInfo))
    usersTopArtistsOrSongs(access_token, 'tracks').then((data) => {
      console.log('artist info', data)
      let allArtists = []
      let artistsInfo = []
      let trackInfo = []
        for(let artist of data.items){
          console.log(artist)
          trackInfo.push({
            'name': artist['name'], 
            'track_uri': artist['uri'], 
            'track_id': artist['id']
          })
          for (let artist_info of artist['artists']){
            if ( !allArtists.includes(artist_info['name'])){
              allArtists.push(artist_info['name'])
              artistsInfo.push({'name': artist_info['name'], 'artistUri' : artist_info['uri']})
          }
        }
      }
      // console.log('all Artist', artistsInfo)
      this.setState({
        usersTopArtists:artistsInfo,
        usersTopSongs: trackInfo
      })
    })
    // usersTopArtistsOrSongs(access_token, 'artists').then((topArtists) => this.setState({usersTopArtists:topArtists}))
  }
}

componentDidUpdate(prevProps, prevState) {
  if(prevState.usersTopArtists !== this.state.usersTopArtists){
    console.log('prevState', prevState, 'top artist', this.state.usersTopArtists, 'top songs', this.state.usersTopSongs)
  }

  }

  render() {
    // console.log(this.state)
    const {
      loggedIn,
      artistName,
      songName,
      playing,
      backgroundImage,
      usersTopArtists,
    } = this.state;

    return (
      <div className="App">
        <Logo />
        {loggedIn ? 
          (<div className="main-wrapper">
            <div className="now-playing__img">
              <img alt={backgroundImage} src={backgroundImage} />
            </div>
            <div className="now-playing__side">
              <div className="now-playing__name">{songName}</div>
              <div className="now-playing__artist">{artistName}</div>
            </div>
            {/* <div className="background" style={backgroundImage} />{" "} */}
            <div>
              <button onClick={() => this.onPrevClick()}>Previous</button>
              <button onClick={() => this.onPlayClick()}>{playing ? "Pause" : "Play"}</button>
              <button onClick={() => this.onNextClick()}>Next</button>
            </div>
        </div>) : <Header  />}
        <Feeling artists={usersTopArtists}/>
      </div>
    );
  }
}

export default App;

