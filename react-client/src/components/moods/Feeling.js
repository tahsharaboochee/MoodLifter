import React, { useState, useEffect } from 'react';
import { queuePlaylist, setPlayerToQueuedPlaylist, playPlaylist } from '../helpers/api-fetcher';
import './feelings.css';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';

// const select_songs_for_feeling(props){
//   console.log(props)

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const Feeling = (props) => {
    const { userId, token, playlists } = props;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState('now Playing');
    // console.log(props);

    const onSadClick = () => {
        // console.log('inside sadClick', playlists, playlists.moodSongsUris.sadUris)
        let sadUris = playlists.moodSongsUris.sadUris;
        onClickHandler(sadUris);
    };
    const onHappyClick = () => {
        // console.log('inside sadClick', playlists, playlists.moodSongsUris.sadUris)
        let happyUris = playlists.moodSongsUris.happyUris;
        onClickHandler(happyUris);
    };
    const onAngryClick = () => {
        // console.log('inside sadClick', playlists, playlists.moodSongsUris.sadUris)
        let angryUris = playlists.moodSongsUris.angryUris;
        onClickHandler(angryUris);
    };
    const onClickHandler = (mood) => {
        mood = shuffle(mood);
        // console.log('inside sadClick', playlists, playlists.moodSongsUris.sadUris)
        let urisPromises = [];
        mood.forEach((uri) => {
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
            <div className="white f3">{'Click your Mood!!!'}</div>
            <div className="center pa3">
                <div className="form pa4 br3 shadow-5 ph3">
                    {/* <button className='w-33 grow no-underline f4 br-pill b bw2 ph3 pv2 mb2 dib white bg-orange'>HAPPY</button>  */}
                    <button
                        onClick={onHappyClick}
                        className="w-33 grow no-underline f4 br-pill b bw2 ph3 pv2 mb2 dib white bg-yellow"
                    >
                        HAPPY
                    </button>
                    <button
                        onClick={onSadClick}
                        className="w-33 grow no-underline f4 br-pill b bw2 ph3 pv2 mb2 dib white bg-light-blue"
                    >
                        SAD
                    </button>
                    <button
                        onClick={onAngryClick}
                        className="w-33 grow no-underline f4 br-pill b bw2 ph3 pv2 mb2 dib white bg-red"
                    >
                        ANGRY
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Feeling;
