import React, { Component } from 'react';
import ColorChanger from './ColorChanger/ColorChanger';
import Home from './Home/Home';
import Login from './login/Login';
import SelectMoodOrPlayMood from './selectMoodOrPlayMood/SelectMoodOrPlayMood';
import {
    createPlaylist,
    fetchAudioFeatures,
    fetchUser,
    getUsersPlaylist,
    setPlaylist,
    transferPlaybackToMoodLifter,
    usersTopArtistsOrSongs,
    fetchRefreshToken,
} from '../helpers/api-fetcher';
import './App.css';
import DotLoader from 'react-spinners/DotLoader';
import { css } from '@emotion/core';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: black;
`;

class App extends Component {
    constructor(props) {
        super(props);

        this.mediaQuery = {
            desktop: 1200,
            tablet: 768,
            phone: 576,
        };

        //set the initial state
        this.state = {
            artistName: 'Artist Name',
            backgroundImage: '',
            deviceId: '',
            loading: true,
            loggedIn: false,
            playing: false,
            playlistPlaying: false,
            refresh_token: null,
            songName: 'track Name',
            token: null,
            userInfo: {},
            usersPlaylists: {},
            windowWidth: null,
            savePlaylistClicked: false,
        };
        //repeatedly check to see if SDK is ready
        this.spotifyPlayerCheckInterval = null;
    }

    //when we sign into spotify
    componentDidMount() {
        window.addEventListener('resize', () => {
            this.setState({ windowWidth: document.body.clientWidth });
        });

        // Set token
        const queryString = window.location.search;
        //parse the query string's parameters
        const urlParams = new URLSearchParams(queryString);
        const access_token = urlParams.get('access_token');
        const refresh_token = urlParams.get('refresh_token');
        window.history.pushState({}, document.title, '/'); //To modify current URL https://stackoverflow.com/questions/22753052/remove-url-parameters-without-refreshing-page
        const moodLifterPlaylists = ['Sad Music MoodLifter', 'Happy Music MoodLifter', 'Angry Music MoodLifter'];

        if (access_token) {
            // Set token, loggedIn variable
            this.setState({
                token: access_token,
                refresh_token: refresh_token,
                loggedIn: true,
                // loading: false,
            });

            //checking every second for spotifies SDK player window.Spotify variable
            this.spotifyPlayerCheckInterval = setInterval(() => this.checkingForSpotifyURI());

            usersTopArtistsOrSongs(access_token, 'tracks')
                .then((data) => {
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
                    songs = await songs;
                    let angrySongs = [],
                        happySongs = [],
                        sadSongs = [];
                    for (let song of songs) {
                        let audio = await fetchAudioFeatures(access_token, song.track_id);
                        let mood = audio.valence;

                        if (mood <= 0.33) {
                            sadSongs.push(song);
                        } else if (mood > 0.33 && mood <= 0.66) {
                            angrySongs.push(song);
                        } else {
                            happySongs.push(song);
                        }
                    }
                    let moods = moodLifterPlaylists.map((mood, i) => {
                        let result = {};
                        if (mood === 'Sad Music MoodLifter') {
                            result[mood] = sadSongs;
                        } else if (mood === 'Angry Music MoodLifter') {
                            result[mood] = angrySongs;
                        } else {
                            result[mood] = happySongs;
                        }
                        return result;
                    });
                    return moods;
                })
                .then((moods) => {
                    let moodSongsUris = {};
                    for (let i = 0; i < moods.length; i++) {
                        let result = [];
                        for (let mood in moods[i]) {
                            moods[i][mood].forEach((song) => {
                                result.push(song['track_uri']);
                            });
                            moodSongsUris[mood] = result;
                        }
                    }

                    return moodSongsUris;
                })
                .then(async (moodSongsUris) => {
                    //user info
                    let playlistInfo = {},
                        userProfile = {};
                    moodSongsUris = await moodSongsUris;
                    fetchUser(access_token).then((userInfo) => {
                        userProfile = userInfo;
                        let id = userInfo.id;
                        getUsersPlaylist(id, access_token)
                            .then(async (playlists) => {
                                playlists = playlists[0];
                                let playlistsName = Object.keys(playlists);

                                for (let playlist in playlists) {
                                    if (moodLifterPlaylists.includes(playlist)) {
                                        playlistInfo[playlist] = playlists[playlist];
                                    }
                                }
                                let result = moodLifterPlaylists.map((mood) => {
                                    if (!playlistsName.includes(mood)) {
                                        return createPlaylist(userInfo.id, access_token, mood).then(async (info) => {
                                            let data = await info,
                                                key = Object.keys(data)[0];
                                            data[key]['uris'] = moodSongsUris[mood];
                                            return data;
                                        });
                                    }
                                });

                                if (Object.keys(playlistInfo).length === 3) {
                                    let playlist = await playlistInfo;
                                    for (let mood in playlistInfo) {
                                        playlistInfo[mood]['uris'] = moodSongsUris[mood];
                                    }
                                    playlists['setPlaylistExist'] = true;
                                    return playlist;
                                } else {
                                    let playlists = Promise.all(result).then(async (playlistInfo) => {
                                        let moodLifterCreatedPlaylists = {};
                                        await playlistInfo.forEach((mood) => {
                                            let key = Object.keys(mood)[0];
                                            moodLifterCreatedPlaylists[key] = mood[key];
                                        });
                                        return moodLifterCreatedPlaylists;
                                    });
                                    playlists['setPlaylistExist'] = false;
                                    return playlists;
                                }
                            })
                            .then(async (playlists) => {
                                playlists = await playlists;

                                if (!playlists['setPlaylistExist']) {
                                    for (let mood in playlists) {
                                        setPlaylist(playlists[mood]['id'], access_token, playlists[mood]['uris']);
                                    }
                                }
                                this.setState({
                                    userInfo: userProfile,
                                    usersPlaylists: playlists,
                                    loading: false,
                                });
                            });
                    });
                });
        }
        // this.getRefreshToken();
    }

    //player received an update from player
    onStateChange(state) {
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
        this.spotifyPlayer.addListener('initialization_error', ({ message }) => {
            console.error('Failed to initialize something is wrong with spotify api', message);
        });
        this.spotifyPlayer.addListener('authentication_error', ({ message }) => {
            console.error('Failed to authenticate', message);
            this.setState({ loggedIn: false });
        });
        this.spotifyPlayer.addListener('account_error', ({ message }) => {
            console.error(message);
        });
        this.spotifyPlayer.addListener('playback_error', ({ message }) => {
            console.error(message);
        });

        //playback status updates
        this.spotifyPlayer.addListener('player_state_changed', (state) => this.onStateChange(state));

        // ready
        this.spotifyPlayer.addListener('ready', ({ device_id }) => {
            transferPlaybackToMoodLifter(device_id, this.state.token);
            this.setState({ deviceId: device_id });
        });

        // Not Ready
        this.spotifyPlayer.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });
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

    getRefreshToken() {
        setInterval(
            () => {
                fetchRefreshToken(this.access_token).then((token) => {
                    let access_token = token.access_token;
                    this.setState({
                        token: access_token,
                        loggedIn: true,
                        loading: false,
                    });
                });
            },
            this.state.loggedIn ? 1000 * 60 * 30 : 1000 * 60 * 60,
        );
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

    onPlaylistClick() {
        this.setState({
            playlistPlaying: !this.playlistPlaying,
        });
    }
    render() {
        const { loggedIn, token, loading, playing, userInfo, playlistPlaying, usersPlaylists } = this.state;

        return (
            <div>
                {loggedIn ? '' : <Login token={token} />}
                {loggedIn ? (
                    loading ? (
                        <div
                            className="center centered pa3 mr4 mw5 mw7-ns ph5-ns"
                            style={{
                                textAlign: 'center',
                                color: 'white',
                            }}
                        >
                            <DotLoader css={override} size={150} color={'#123abc'} loading={loading} />
                            <br />
                            <p
                                className="f3"
                                style={{
                                    color: 'white',
                                }}
                            >
                                {'Please wait while your playlists load'}
                            </p>
                        </div>
                    ) : (
                        <div
                            style={{
                                textAlign: 'center',
                                color: 'white',
                            }}
                        >
                            <SelectMoodOrPlayMood
                                state={this.state}
                                onPrevClick={this.onPrevClick.bind(this)}
                                onNextClick={this.onNextClick.bind(this)}
                                onPlayClick={this.onPlayClick.bind(this)}
                                onPlaylistClick={this.onPlaylistClick.bind(this)}
                                userName={userInfo.display_name}
                                userId={userInfo.id}
                                playlists={usersPlaylists}
                                playlistPlaying={playlistPlaying}
                                token={token}
                                playing={playing}
                                onPlaylistClick={this.onPlaylistClick.bind(this)}
                            />
                        </div>
                    )
                ) : (
                    <Home />
                )}
                <ColorChanger />
            </div>
        );
    }
}

export default App;
