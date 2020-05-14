import React, { Component } from 'react';
import ColorChanger from './ColorChanger/ColorChanger';
import Home from './Home/Home';
import Login from './login/Login';
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
import Player from './player/Player';
import './App.css';

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
            windowWidth: null,
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
                    for (let song of songs) {
                        let audio = await fetchAudioFeatures(access_token, song.track_id);
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
                    let angryMood = moods['angry'];
                    let happyMood = moods['happy'];
                    let sadMood = moods['sad'];

                    angryMood.forEach((song) => {
                        angryMoodUris.push(song['track_uri']);
                    });
                    happyMood.forEach((song) => {
                        happyMoodUris.push(song['track_uri']);
                    });
                    sadMood.forEach((song) => {
                        sadMoodUris.push(song['track_uri']);
                    });

                    let moodSongsUris = { angryUris: angryMoodUris, happyUris: happyMoodUris, sadUris: sadMoodUris };

                    return moodSongsUris;
                })
                .then((moodSongsUris) => {
                    //user info
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
                                if (!playlistsName.includes('Sad Music MoodLifter')) {
                                    console.log('playlist does not exist');
                                    sad = createPlaylist(userInfo.id, access_token, 'Sad Music MoodLifter').then(
                                        async (info) => {
                                            let data = await info;
                                            return data;
                                        },
                                    );
                                }
                                if (!playlistsName.includes('Angry Music MoodLifter')) {
                                    console.log('playlist does not exist');
                                    angry = createPlaylist(userInfo.id, access_token, 'Angry Music MoodLifter').then(
                                        async (info) => {
                                            let data = await info;
                                            return data;
                                        },
                                    );
                                }
                                if (!playlistsName.includes('Happy Music MoodLifter')) {
                                    console.log('playlist does not exist');
                                    happy = createPlaylist(userInfo.id, access_token, 'Happy Music MoodLifter').then(
                                        async (info) => {
                                            let data = await info;
                                            return data;
                                        },
                                    );
                                }

                                if (Object.keys(playlistInfo).length === 3) {
                                    let playlist = await playlistInfo;
                                    return {
                                        playlistInfo: playlist,
                                        moodSongsUris: moodSongsUris,
                                        setPlaylistExist: true,
                                    };
                                } else {
                                    let moodLifterCreatedPlaylists = Promise.all([angry, happy, sad]);
                                    return {
                                        moodLifterCreatedPlaylists: moodLifterCreatedPlaylists,
                                        moodSongsUris: moodSongsUris,
                                        setPlaylistExist: false,
                                    };
                                }
                            })
                            .then(async (playlists) => {
                                playlists = await playlists;
                                let moodLifterCreatedPlaylists = await playlists['moodLifterCreatedPlaylists'];

                                console.log('playlist', playlists);
                                if (!playlists['setPlaylistExist']) {
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
                            });
                    });
                });
        }
        this.getRefreshToken();
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
            transferPlaybackToMoodLifter(device_id, this.state.token);
            this.setState({ deviceId: device_id });
        });
    }

    onPrevClick() {
        this.spotifyPlayer.previousTrack();
    }

    onPlayClick() {
        this.spotifyPlayer.togglePlay();
    }

    onNextClick() {
        console.log('clicked next')
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

    render() {
        const { loggedIn, token } = this.state;

        return (
            <div>
                {loggedIn ? '' : <Login token={token} />}
                {loggedIn ? (
                    <Player
                        state={this.state}
                        onPrevClick={this.onPrevClick.bind(this)}
                        onNextClick={this.onNextClick.bind(this)}
                        onPlayClick={this.onPlayClick.bind(this)}
                    />
                ) : (
                    <Home />
                )}
                <ColorChanger />
            </div>
        );
    }
}

export default App;
