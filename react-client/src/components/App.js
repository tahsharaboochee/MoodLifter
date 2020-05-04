import React, { Component } from 'react';
import { css } from '@emotion/core';
import DotLoader from 'react-spinners/DotLoader';
import Login from './login/Login';
import Logo from './logo/Logo';
import Feeling from './moods/Feeling';
import ColorChanger from './ColorChanger/ColorChanger';
// import Signup from './stayInformed/SignUp'
import Layout from './layout/Layout'
// import Footer from './footer/Footer'
import {
    createPlaylist,
    fetchAudioFeatures,
    fetchUser,
    getUsersPlaylist,
    setPlaylist,
    transferPlaybackToMoodLifter,
    usersTopArtistsOrSongs,
    playPlaylist,
} from './helpers/api-fetcher';
import Header from './header/Header';
import './App.css';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: black;
`;
// A Spotify URI is a link that you can find in the Share menu of any track, album, or artist page on Spotify. When a user clicks a link that consists of a Spotify URI (rather than an URL/HTTP address), they're taken directly to the Spotify application, without having to go through the web page first.
// import logo from './logo.svg';

class App extends Component {
    constructor(props) {
        super(props);
        //set the initial state
        this.state = {
            loading: true,
            refresh_token: null,
            token: null,
            userInfo: {},
            usersPlaylists: {},
            loggedIn: false,
            playing: false,
            deviceId: '',
            songName: 'track Name',
            artistName: 'Artist Name',
            position: 0,
            duration: 0,
            backgroundImage: '',
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
        const access_token = urlParams.get('access_token');
        const refresh_token = urlParams.get('refresh_token');
        const moodLifterPlaylists = ['Sad Music MoodLifter', 'Happy Music MoodLifter', 'Angry Music MoodLifter'];
        let playlistInfo = {},
            userProfile = {},
            angrySongs = [],
            happySongs = [],
            sadSongs = [],
            angry,
            happy,
            sad,
            angryMoodUris = [],
            happyMoodUris = [],
            sadMoodUris = [];
        // console.log('we have a token', access_token, '\nrefresh token', refresh_token)
        if (access_token) {
            // Set token, loggedIn variable
            this.setState({
                token: access_token,
                refresh_token: refresh_token,
                loggedIn: true,
            });

            //checking every second for spotifies SDK player window.Spotify variable
            this.spotifyPlayerCheckInterval = setInterval(() => this.checkingForSpotifyURI());

            usersTopArtistsOrSongs(access_token, 'tracks')
                .then((data) => {
                    // console.log('song info', data.items)
                    let songs = data.items.map((song) => {
                        return {
                            name: song['name'],
                            track_uri: song['uri'],
                            track_id: song['id'],
                        };
                    });
                    return songs;
                })
                .then(async (songs) => {
                    songs = await songs
                    // console.log('top songs', songs)
                    for (let song of songs) {
                        let audio = await fetchAudioFeatures(access_token, song.track_id);
                        // console.log('fetch audio features', audio)
                        let mood = audio.valence;
                        // let danceability = await audio.danceability;
                        // let energy = await audio.energy;

                        if (mood <= 0.33) {
                            sadSongs.push(song);
                        } else if (mood > 0.33 && mood <= 0.66) {
                            angrySongs.push(song);
                        } else {
                            happySongs.push(song);
                        }
                    }
                    let moods = { angry: angrySongs, happy: happySongs, sad: sadSongs };
                    return moods;
                })
                .then((moods) => {
                    // console.log('after fetch audio features request moods', moods)
                    let angryMood = moods['angry'];
                    let happyMood = moods['happy'];
                    let sadMood = moods['sad'];

                    angryMood.forEach((song) => {
                        // console.log(song['track_uri'])
                        angryMoodUris.push(song['track_uri']);
                    });
                    happyMood.forEach((song) => {
                        // console.log(song['track_uri'])
                        happyMoodUris.push(song['track_uri']);
                    });
                    sadMood.forEach((song) => {
                        // console.log(song['track_uri'])
                        sadMoodUris.push(song['track_uri']);
                    });
                    // console.log('angryMoodUris', angryMoodUris)
                    let moodSongsUris = { angryUris: angryMoodUris, happyUris: happyMoodUris, sadUris: sadMoodUris };
                    // console.log('moodSongUris', moodSongsUris)
                    return moodSongsUris;
                })
                .then((moodSongsUris) => {
                // console.log('mood uris', moodSongsUris)
                // //user info
                fetchUser(access_token).then((userInfo) => {
                            // console.log('inside fetch user', userInfo)
                userProfile = userInfo;
                let id = userInfo.id;
                getUsersPlaylist(id, access_token)
                    .then(async (playlists) => {
                        console.log('getting users playlist', playlists);
                        playlists = playlists[0];
                        let playlistsName = Object.keys(playlists);

                        for (let playlist in playlists) {
                            if (moodLifterPlaylists.includes(playlist)) {
                                playlistInfo[playlist] = playlists[playlist];
                            }
                        }
                        // console.log(playlistInfo)
                        if (!playlistsName.includes('Sad Music MoodLifter')) {
                            console.log('playlist does not exist');
                            sad = createPlaylist(userInfo.id, access_token, 'Sad Music MoodLifter').then(
                                async (info) => {
                                    // console.log('listInfo', info)
                                    let data = await info;
                                    return data;
                                },
                            );
                        }
                        if (!playlistsName.includes('Angry Music MoodLifter')) {
                            console.log('playlist does not exist');
                            angry = createPlaylist(userInfo.id, access_token, 'Angry Music MoodLifter').then(
                                async (info) => {
                                    // console.log('listInfo', info)
                                    let data = await info;
                                    return data;
                                },
                            );
                        }
                        if (!playlistsName.includes('Happy Music MoodLifter')) {
                            console.log('playlist does not exist');
                            happy = createPlaylist(userInfo.id, access_token, 'Happy Music MoodLifter').then(
                                async (info) => {
                                    // console.log('listInfo', info)
                                    let data = await info;
                                    return data;
                                },
                            );
                        }
                        // console.log(playlistInfo, 'length', Object.keys(playlistInfo).length)
                        if (Object.keys(playlistInfo).length === 3) {
                            console.log('playlist Info', playlistInfo);
                            let playlist = await playlistInfo;
                            return {
                                playlistInfo: playlist,
                                moodSongsUris: moodSongsUris,
                                setPlaylistExist: true,
                            };
                            // return playlistInfo
                        } else {
                            let moodLifterCreatedPlaylists = Promise.all([angry, happy, sad]);
                            return {
                                moodLifterCreatedPlaylists: moodLifterCreatedPlaylists,
                                moodSongsUris: moodSongsUris,
                                setPlaylistExist: false,
                            };
                            // return  moodLifterCreatedPlaylists
                        }
                    })
                    .then(async (playlists) => {
                        playlists = await playlists;
                        let moodLifterCreatedPlaylists = await playlists['moodLifterCreatedPlaylists']

                        console.log('playlist', playlists);
                        if (!playlists['setPlaylistExist']) {
                            console.log(
                                'about to set playlist');
                            let setAngryPlaylist = setPlaylist(
                                moodLifterCreatedPlaylists[0]['Angry Music MoodLifter']['id'],
                                access_token,
                                angryMoodUris,
                            );
                            let setHappyPlaylist = setPlaylist(
                                moodLifterCreatedPlaylists[1]['Happy Music MoodLifter']['id'],
                                access_token,
                                happyMoodUris,
                            );
                            let setSadPlaylist = setPlaylist(
                                moodLifterCreatedPlaylists[2]['Sad Music MoodLifter']['id'],
                                access_token,
                                sadMoodUris,
                            );
                            let moodLifterSetPlaylists = await Promise.all([
                                setAngryPlaylist,
                                setHappyPlaylist,
                                setSadPlaylist,
                            ]);
                            this.setState({
                                userInfo: userProfile,
                                usersPlaylists: playlists,
                                loading: false,
                            });
                        } else {
                            this.setState({
                                userInfo: userProfile,
                                usersPlaylists: playlists,
                                loading: false,
                            });
                        }

                        // return playlists
                    });
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
            const artistName = current_track.artists.map((artist) => artist.name).join(',');
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
        this.spotifyPlayer.addListener('initialization_error', (message) => {
            console.error('Failed to initialize', message);
        });
        this.spotifyPlayer.addListener('authentication_error', (message) => {
            console.error('Failed to authenticate', message);
            this.setState({ loggedIn: false });
        });
        this.spotifyPlayer.addListener('account_error', (e) => {
            console.error(e);
        });
        this.spotifyPlayer.addListener('playback_error', (e) => {
            console.error(e);
        });

        //playback status updates
        this.spotifyPlayer.addListener('player_state_changed', (state) => this.onStateChange(state));

        // ready
        this.spotifyPlayer.addListener('ready', (data) => {
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
                name: 'Mood Lifter Spotify Player',
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
            token,
            loading,
        } = this.state;
        // console.log(this.state)

        return (
            <div className="App">
                <ColorChanger />
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
                            <button onClick={() => this.onPlayClick()}>{playing ? 'Pause' : 'Play'}</button>
                            <button onClick={() => this.onNextClick()}>Next</button>
                        </div>
                        <div className="white f3"></div>
                        {loading ? (
                            <DotLoader css={override} size={150} color={'#123abc'} loading={this.state.loading} />
                        ) : (
                            <Feeling userId={userInfo.id} playlists={usersPlaylists} token={token} />
                            )}
                    </div>
                ) : (
                  <Login />
                  )}
                  {loggedIn ? <Header user={userInfo} /> : <Layout/>} {/*<Logo /> */}
                
                {/* <Signup/> */}
                {/* <Footer/> */}
            </div>
        );
     
    }
}

export default App;
