import React, { useState, useEffect } from 'react';
import { queuePlaylist, setPlayerToQueuedPlaylist, play } from '../../helpers/api-fetcher';
import './Moods.css';
import angryPic from '../photos/angryPic.jpeg';
import happyPic from '../photos/happyPic.jpeg';
import sadPic from '../photos/sadPic.jpeg';
import { Card, CardImg, CardBody, CardFooter } from 'reactstrap';

const Moods = (props) => {
    const { userId, token, playlists, playing} = props;
useEffect(() =>{
    console.log('inside use effect', playlists)
})

    const onSadClick = () => {
        let sadUris = playlists.moodSongsUris.sadUris;
        // console.log(sadUris)
        onClickHandler(sadUris.splice(0, 5))
        let interval = setInterval(() => { 
            if (sadUris.length > 0) {
                onClickHandler(sadUris.splice(0, 5));
            } else {
              clearInterval(interval);
            }
        }, 1000 * 60 * 5);
        if(!playing){
            setPlayerToQueuedPlaylist(token).then(() => {
                play(token);
            });
        }
        // play(token);
        props.playlistPlaying();
    };
    const onHappyClick = () => {
        let happyUris = playlists.moodSongsUris.happyUris;
        console.log('original happy uris list', Array.isArray(happyUris), happyUris)
        let result = happyUris.splice(0, 5)
        onClickHandler(result);
        let interval = setInterval(() => { 
            if (happyUris.length > 0) {
                onClickHandler(happyUris.splice(0, 5));
            } else {
              clearInterval(interval);
            }
        }, 1000 * 60 * 5);
        if(!playing){
            setPlayerToQueuedPlaylist(token).then(() => {
                play(token);
            });
        }
        props.playlistPlaying();
    };
    const onAngryClick = () => {
        let angryUris = playlists.moodSongsUris.angryUris;
        onClickHandler(angryUris);
        // onClickHandler(angryUris.splice(0, 5));
        // let interval = setInterval(() => { 
        //     if (angryUris.length > 0) {
        //         onClickHandler(angryUris.splice(0, 5));
        //     } else {
        //       clearInterval(interval);
        //     }
        // }, 1000 * 60 * 5);
        if(!playing){
            setPlayerToQueuedPlaylist(token).then(() => {
                play(token);
            });
        }
        props.playlistPlaying();
    };
    const onClickHandler = (mood) => {
        console.log('before first splice', mood)
        let temp = (shuffle(mood)).splice(0, 5);
        for(let uri of mood){
            queuePlaylist(token, uri)
        }
        let interval = setInterval(() => { 
            console.log('after first splice', mood)
            temp = (shuffle(mood)).splice(0, 5);
            if (temp.length > 0) {
                for(let uri of temp){
                    queuePlaylist(token, uri)
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
        return array
      }

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
