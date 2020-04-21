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
      topArtistsUri: [],
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
    fetchUser(access_token).then((userInfo) => console.log(userInfo))
    //only able to retrieve data when I set state
    usersTopArtistsOrSongs(access_token, 'tracks').then((topTracks) => this.setState({usersTopSongs: topTracks.items}))


    // usersTopArtistsOrSongs(access_token, 'artists').then((topArtists) => this.setState({usersTopArtists:topArtists}))
  }
}

componentDidUpdate(prevProps, prevState) {
  console.log('top artist', this.state.usersTopArtists, '\ntop tracks', this.state.usersTopSongs)
  let allArtists = []
  let topArtistsUri = []
 
  // this.setState({usersTopArtist:allArtists})
  
  console.log('inside component did update')
  if (prevState.token !== this.state.token) {
    console.log('inside component did update if statement')
    for (let tracks of this.state.usersTopSongs){
      for(let artist of tracks['artists']){
        if ( !allArtists.includes(artist['name'])){
          allArtists.push(artist['name'])
          topArtistsUri.push(artist['uri'])
        }
      }
    }
    this.setState({
      usersTopArtists: allArtists,
      topArtistsUri
    })
  }

  }

  render() {
    const {
      loggedIn,
      artistName,
      songName,
      playing,
      backgroundImage
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
        </div>) : <Header />}
        <Feeling />
      </div>
    );
  }
}

export default App;

