import React, { Component } from "react";
import Login from "./login/Login";
import Logo from "./logo/Logo";
import CreatePlaylist from "./moods/CreateAPlaylist";
// import Feeling from './moods/Feeling'
import {
  createPlaylist,
  deleteUsersPlaylist,
  fetchAudioFeatures,
  fetchUser,
  getUsersPlaylist,
  setPlaylist,
  transferPlaybackToMoodLifter,
  usersTopArtistsOrSongs,
} from "./helpers/api-fetcher";
import Header from "./header/Header";
import "./App.css";

// A Spotify URI is a link that you can find in the Share menu of any track, album, or artist page on Spotify. When a user clicks a link that consists of a Spotify URI (rather than an URL/HTTP address), they're taken directly to the Spotify application, without having to go through the web page first.
// import logo from './logo.svg';

class App extends Component {
  constructor(props) {
    super(props);
    //set the initial state
    this.state = {
      userInfo: {},
      usersPlaylists: [],
      refresh_token: null,
      token: null,
      usersTopArtists: [],
      usersTopSongs: [],
      songUris: "",
      moods: {},
      loggedIn: false,
      playing: false,
      deviceId: "",
      songName: "track Name",
      artistName: "Artist Name",
      position: 0,
      duration: 0,
      backgroundImage: "",
    };
    //repeatedly check to see if SDK is ready
    this.spotifyPlayerCheckInterval = null;
  }

  //when we sign into spotify
  componentDidMount() {
    // Set token
    const queryString = window.location.search;
    //parse the query string's parameters
    const urlParams = new URLSearchParams(queryString);
    const access_token = urlParams.get("access_token");
    const refresh_token = urlParams.get("refresh_token");
    const moodLifterPlaylists = [
    "Sad Music MoodLifter",
    "Happy Music MoodLifter",
    "Angry Music MoodLifter",
  ];
  let playlistInfo = {}
    // console.log('we have a token', access_token, '\nrefresh token', refresh_token)
    if (access_token) {
      // Set token, loggedIn variable
      this.setState({
        token: access_token,
        refresh_token: refresh_token,
        loggedIn: true,
      });

      //checking every second for spotifies SDK player window.Spotify variable
      this.spotifyPlayerCheckInterval = setInterval(() =>
        this.checkingForSpotifyURI()
      );
      // //user info
      fetchUser(access_token).then((userInfo) => {
        let id = userInfo.id;
        getUsersPlaylist(id, access_token).then((playlists) => {
          playlists = playlists[0];
          let playlistsName = Object.keys(playlists);
          // let playlistInfo = {}
          // console.log(playlistsName, playlists);
          for(let playlist in playlists){
            if(moodLifterPlaylists.includes(playlist)){
              playlistInfo[playlist] = playlists[playlist]
            }
          }
          return playlistInfo
        })
        .then((playlists)=>{
          for(let playlist in playlists){
            // console.log('deleting playlist', playlist)
            deleteUsersPlaylist(playlists[playlist], access_token)
          }

        })
        .then(() => {
          console.log('about to create moodlifter playlists')
          let sad = createPlaylist(userInfo.id, access_token, 'Sad Music MoodLifter').then(async (info) => {
            // console.log('listInfo', info)
            let data = await info
            return data
          });
          let angry = createPlaylist(userInfo.id, access_token, 'Angry Music MoodLifter').then(async (info) => {
            // console.log('listInfo', info)
            let data = await info
            return data
          });
          let happy = createPlaylist(userInfo.id, access_token, 'Happy Music MoodLifter').then(async (info) => {
            // console.log('listInfo', info)
            let data = await info
            return data
          });
          
          let moodLifterCreatedPlaylists = Promise.all([angry, happy, sad])
          // moodLifterCreatedPlaylists.then((x) => console.log(x))
          // console.log('moodLifterCreatedPlaylists', moodLifterCreatedPlaylists);
          return moodLifterCreatedPlaylists
        })
        .then((moodLiftersPlaylists) =>{
          let angryMood = this.state.moods['angry']
          let happyMood = this.state.moods['happy']
          let sadMood = this.state.moods['sad']
          let angryMoodUris = []
          
          angryMood.forEach((song) =>{
            // console.log(song['track_uri'])
            angryMoodUris.push(song['track_uri'])
          })
          
          let setAngryPlaylist = setPlaylist(playlistInfo['Angry Music MoodLifter'], access_token, angryMoodUris)
          console.log('playlist info', playlistInfo, '\n angry:', playlistInfo['Angry Music MoodLifter'], '\nangry uris', angryMoodUris)
          // console.log('array of playlists', moodLiftersPlaylists, '\n moods', '\n angry', angryMoodUris, '\n happy', happyMood, '\n sad', sadMood)
        })
        .then(async (moodLiftersCreatedPlaylist) => {
          // console.log('array of playlists', moodLiftersCreatedPlaylist, this.state.moods)
          // this.setState({usersPlaylists: await moodLiftersCreatedPlaylist});
        })
      });

      let allArtists = [],
        artistsInfo = [],
        trackInfo = [],
        songUris = "",
        angrySongs = [],
        happySongs = [],
        sadSongs = [];
      usersTopArtistsOrSongs(access_token, "tracks")
        .then((data) => {
          // console.log('artist info', data)
          for (let artist of data.items) {
            // console.log(artist)
            trackInfo.push({
              name: artist["name"],
              track_uri: artist["uri"],
              track_id: artist["id"],
            });
            for (let artist_info of artist["artists"]) {
              if (!allArtists.includes(artist_info["name"])) {
                allArtists.push(artist_info["name"]);
                songUris += artist_info["uri"] + ",";
                artistsInfo.push({
                  name: artist_info["name"],
                  artistUri: artist_info["uri"],
                });
              }
            }
          }
          let songs = trackInfo;
          return songs;
        })
        .then((songs) => {
          for (let song of songs) {
            // console.log(song)
            fetchAudioFeatures(access_token, song.track_id).then((audio) => {
              let mood = audio.valence;
              if (mood <= 0.33) {
                sadSongs.push(song);
              } else if (mood > 0.33 && mood <= 0.66) {
                angrySongs.push(song);
              } else {
                happySongs.push(song);
              }
            });
          }
          //get rid of the last comma
          songUris = songUris.substring(0, songUris.length - 1);
          // // console.log('all Artist', artistsInfo)
          this.setState({
            usersTopArtists: artistsInfo,
            usersTopSongs: trackInfo,
            songUris,
            moods: { angry: angrySongs, happy: happySongs, sad: sadSongs },
          });
        });
    }
  }

  //player received an update from player
  onStateChange(state) {
    // console.log('onStateChange line 72 state=', state)

    if (state !== null) {
      const { current_track } = state.track_window;
      const songName = current_track.name;
      const position = current_track.position;
      const duration = current_track.duration;
      const artistName = current_track.artists
        .map((artist) => artist.name)
        .join(",");
      const playing = !state.paused;
      const backgroundImage = current_track.album.images[0].url;

      this.setState({
        position,
        duration,
        songName,
        artistName,
        playing,
        backgroundImage: backgroundImage,
      });
    }
  }

  spotifyApiEventHandlers() {
    // Error handling
    this.spotifyPlayer.addListener("initialization_error", (message) => {
      console.error("Failed to initialize", message);
    });
    this.spotifyPlayer.addListener("authentication_error", (message) => {
      console.error("Failed to authenticate", message);
      this.setState({ loggedIn: false });
    });
    this.spotifyPlayer.addListener("account_error", (e) => {
      console.error(e);
    });
    this.spotifyPlayer.addListener("playback_error", (e) => {
      console.error(e);
    });

    //playback status updates
    this.spotifyPlayer.addListener("player_state_changed", (state) =>
      this.onStateChange(state)
    );

    // ready
    this.spotifyPlayer.addListener("ready", (data) => {
      let { device_id } = data;
      //  console.log('let the music play on!', data)
      // swap music playback to moodLifter
      transferPlaybackToMoodLifter(device_id, this.state.token);
      // fetchAudioFeatures(this.state)
      // console.log(this.spotifyPlayer)
      this.setState({ deviceId: device_id });
      //  console.log('getting spotifyPlayer data .then', this.state.deviceId)
    });
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

  checkingForSpotifyURI() {
    const { token } = this.state;
    //global variable Spotify is public index.html file however to access the global variable have to use window.Spotify
    if (window.Spotify !== undefined) {
      //cancel the interval
      clearInterval(this.spotifyPlayerCheckInterval);

      this.spotifyPlayer = new window.Spotify.Player({
        name: "Mood Lifter Spotify Player",
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });

      //set up the spotify uri event handlers
      this.spotifyApiEventHandlers();
      //finally, connect!
      this.spotifyPlayer.connect();
    }
  }

  render() {
    const {
      userInfo,
      loggedIn,
      artistName,
      songName,
      playing,
      backgroundImage,
      usersPlaylists,
      moods,
      token,
    } = this.state;
    // console.log(userInfo)

    return (
      <div className="App">
        {loggedIn ? <Header user={userInfo} /> : <Logo />}
        {/* <Logo /> */}
        {loggedIn ? (
          <div className="main-wrapper">
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
              <button onClick={() => this.onPlayClick()}>
                {playing ? "Pause" : "Play"}
              </button>
              <button onClick={() => this.onNextClick()}>Next</button>
            </div>
            <CreatePlaylist
              userId={userInfo.id}
              playlists={usersPlaylists}
              token={token}
              moods={moods}
              // sad={this.sadClick}
            />
            {/* <Feeling userId={userInfo.id} playlists={usersPlaylists} state={this.state} sad={this.sadClick}/> */}
            {/* <Feeling sadClick={this.state.sadClick.bind(this)} tracks={usersTopSongs}/> */}
          </div>
        ) : (
          <Login />
        )}
      </div>
    );
  }
}

export default App;
