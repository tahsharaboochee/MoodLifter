import React, { useState, useEffect } from 'react';
import { queuePlaylist, setPlayerToQueuedPlaylist, play } from '../../helpers/api-fetcher';
import './Moods.css';
import angryPic from '../photos/angryPic.jpeg';
import happyPic from '../photos/happyPic.jpeg';
import sadPic from '../photos/sadPic.jpeg';
import PropTypes from 'prop-types'
import { Card, CardImg, CardBody, CardFooter } from 'reactstrap';

const Moods = (props) => {
    const { userId, token, playlists, playing } = props;
    const onSadClick = () => {
        let sadUris = playlists['Sad Music MoodLifter'].uris;
        onClickHandler(sadUris);
        if (!playing) {
            setPlayerToQueuedPlaylist(token).then(() => {
                play(token);
            });
        }
        if (!playing) {
            setPlayerToQueuedPlaylist(token).then(() => {
                play(token);
            });
        }
        props.onPlaylistClick();
    };
    const onHappyClick = () => {
        let happyUris = playlists['Happy Music MoodLifter'].uris;
        onClickHandler(happyUris);
        if (!playing) {
            setPlayerToQueuedPlaylist(token).then(() => {
                play(token);
            });
        }
        props.onPlaylistClick();
    };
    const onAngryClick = () => {
        let angryUris = playlists['Angry Music MoodLifter'].uris;
        onClickHandler(angryUris);
        if (!playing) {
            setPlayerToQueuedPlaylist(token).then(() => {
                play(token);
            });
        }
        props.onPlaylistClick();
    };
    const onClickHandler = (mood) => {
        let temp = shuffle(mood).splice(0, 5);
        for (let uri of mood) {
            queuePlaylist(token, uri);
        }
        let interval = setInterval(() => {
            temp = shuffle(mood).splice(0, 5);
            if (temp.length > 0) {
                for (let uri of temp) {
                    queuePlaylist(token, uri);
                }
            } else {
                clearInterval(interval);
            }
        }, 1000 * 60 * 5);
    };
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
            // swap elements array[i] and array[j]
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    return (
        <div data-test='MoodComponent'>
            <div className="white pa3 f3" data-test='userName'>
                {props.userName}
                {' Click your Mood'}
            </div>
            <br />
            <div className="pa3">
                <button data-test='onClickFunction'
                    onClick={onHappyClick}
                    className="pointer btn btn--playlist no-underline f4 b bw2 ph3 pv2 mb2 dib white bg-transparent bg-animate hover-bg-black hover-white"
                >
                    <Card>
                        <CardBody>
                            <CardImg className="br-100 h4 w4 dib ba b--black-05 pa2" src={happyPic} alt="album cover" />
                        </CardBody>
                        <CardFooter>HAPPY</CardFooter>
                    </Card>
                </button>
                <span className="pa3"></span>
                <button data-test='onClickFunction'
                    onClick={onSadClick}
                    className="pointer btn btn--playlist no-underline f4 b bw2 ph3 pv2 mb2 dib white bg-transparent bg-animate hover-bg-black hover-white"
                >
                    <Card>
                        <CardBody>
                            <CardImg className="br-100 h4 w4 dib ba b--black-05 pa2" src={sadPic} alt="album cover" />
                        </CardBody>
                        <CardFooter>SAD</CardFooter>
                    </Card>
                </button>
                <span className="pa3"></span>
                <button data-test='onClickFunction'
                    onClick={onAngryClick}
                    className="pointer btn btn--playlist no-underline f4 b bw2 ph3 pv2 mb2 dib white bg-transparent bg-animate hover-bg-black hover-white"
                >
                    <Card>
                        <CardBody>
                            <CardImg
                                style={{ backgroundColor: 'transparent' }}
                                className="br-100 h4 w4 dib ba b--black-05 pa2"
                                src={angryPic}
                                alt="album cover"
                            />
                        </CardBody>
                        <CardFooter>ANGRY</CardFooter>
                    </Card>
                </button>
            </div>
        </div>
    );
};

Moods.propTypes = {
    userName: PropTypes.string,
    userId: PropTypes.string,
    playlists:  PropTypes.array,
    playlistPlaying: PropTypes.bool,
    token:PropTypes.string,
    playing:PropTypes.bool,
    onPlaylistClick: PropTypes.func,
}

export default Moods;
