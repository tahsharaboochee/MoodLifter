import React, {Component} from 'react';
import Header from './header/Header'
import Logo from './logo/Logo'
import Feeling from './moods/Feeling'
import query from './query'
import {transferPlaybackToMoodLifter, usersTopArtist} from './helpers/api-fetcher'
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
    let access_token = query.access_token;
    let refresh_token = query.refresh_token;
    console.log('we have a token', access_token)
    if (access_token) {
      // Set token, loggedIn variable
      this.setState({
        token: access_token,
        refresh_token: refresh_token,
        loggedIn: true
      });
      //checking every second for spotifies SDK player window.Spotify variable
      this.spotifyPlayerCheckInterval = setInterval(() => this.checkingForSpotifyURI())
    }
  }

  //player recieved an update from player
  onStateChange(state) {
    // console.log('onStateChange line 72 state=', state)

    if(state !== undefined){
      const {
        current_track
      } = state.track_window; 
      const songName = current_track.name; 
      const position = current_track.position;
      const duration = current_track.duration;
      const artistName = current_track.artists.map(artist => artist.name).join(',');
      const playing = !state.paused; 
      const backgroundImage = current_track.album.images[0].url;
 

      this.setState({
        position,
        duration,
        songName,
        artistName,
        playing,
        backgroundImage: backgroundImage
      });
    }
  }

  spotifyApiEventHandlers(){
    // Error handling
   this.spotifyPlayer.addListener('initialization_error', message => { console.error('Failed to initialize', message)})
   this.spotifyPlayer.addListener('authentication_error', message => {
     console.error('Failed to authenticate', message);
     this.setState({loggedIn: false});
   });
   this.spotifyPlayer.addListener('account_error', e => { console.error(e)})
   this.spotifyPlayer.addListener('playback_error', e => { console.error(e)})

   //playback status updates
   this.spotifyPlayer.addListener('player_state_changed', state => this.onStateChange(state))

   // ready
   this.spotifyPlayer.addListener('ready', data => {
     let {device_id} = data;
    //  console.log('let the music play on!', data)
      // swap music playback to moodLifter
      transferPlaybackToMoodLifter(device_id, this.state.token);
      console.log('usersTopArtis', usersTopArtist(this.state.token))

      this.setState({ deviceId: device_id });
    //  console.log('getting spotifyPlayer data .then', this.state.deviceId)
   })
 }

  onPrevClick() {
    this.spotifyPlayer.previousTrack();
  }
  
  onPlayClick() {
    this.spotifyPlayer.togglePlay();
  }
  
  onNextClick() {
    this.spotifyPlayer.nextTrack();
  }

  checkingForSpotifyURI(){
    const {token} = this.state;
    //global variable Spotify is public index.html file however to access the global variable have to use window.Spotify
    if(window.Spotify !== undefined){
      //cancel the interval
      clearInterval(this.spotifyPlayerCheckInterval);
      
      this.spotifyPlayer = new window.Spotify.Player({
        name: 'Mood Lifter Spotify Player',
        getOAuthToken: cb => { cb(token) },
        volume: 0.5
      })
      
      //set up the spotify uri event handlers
      this.spotifyApiEventHandlers();
      //finally, connect!
      this.spotifyPlayer.connect();
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

