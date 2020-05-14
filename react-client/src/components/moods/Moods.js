import React, { useState, useEffect } from 'react';
import { queuePlaylist, setPlayerToQueuedPlaylist, playPlaylist } from '../../helpers/api-fetcher';
import './Moods.css';
import angryPic from '../photos/angryPic.jpeg';
import happyPic from '../photos/happyPic.jpeg';
import sadPic from '../photos/sadPic.jpeg';
import { Card, CardImg, CardBody, CardFooter } from 'reactstrap';

const Moods = (props) => {
    const { userId, token, playlists } = props;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState('now Playing');
    // console.log(props);

    const onSadClick = () => {
        // console.log('inside sadClick', playlists, playlists.moodSongsUris.sadUris)
        console.log('playlist playing true');
        let sadUris = playlists.moodSongsUris.sadUris;
        onClickHandler(sadUris);
        props.playlistPlaying();
    };
    const onHappyClick = () => {
        let happyUris = playlists.moodSongsUris.happyUris;
        onClickHandler(happyUris);
        props.playlistPlaying();
    };
    const onAngryClick = () => {
        let angryUris = playlists.moodSongsUris.angryUris;
        onClickHandler(angryUris);
        props.playlistPlaying();
    };
    const onClickHandler = (mood) => {
        mood = shuffle(mood);
        let urisPromises = [];
        mood.forEach((uri) => {
            console.log('uri:', uri);
            urisPromises.push(queuePlaylist(token, uri));
        });
        Promise.all(urisPromises).then(() => {
            setPlayerToQueuedPlaylist(token).then(() => {
                playPlaylist(token);
            });
        });
    };
    const shuffle = function (array) {
        let currentIndex = array.length;
        let temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };

    return (
        <div>
            <div className="white pa3 f3">
                {props.userName}
                {' Click your Mood'}
            </div>
            <br />
            <div className="pa3">
                <button
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
                <button
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
                <button
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

export default Moods;
