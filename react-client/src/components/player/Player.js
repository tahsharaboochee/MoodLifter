import React from 'react';
import { css } from '@emotion/core';
import DotLoader from 'react-spinners/DotLoader';
import Moods from '../moods/Moods';
import './Player.css';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: black;
`;
const Player = (props) => {
    const {
        userInfo,
        artistName,
        songName,
        playing,
        backgroundImage,
        usersPlaylists,
        token,
        loading,
    } = props.state;
    return (
        <div>
            <div className="main-wrapper" >
                        <div className="ma4 mt0">
                            {/* <p className="f1 white underline"> MOOD LIFTER</p> */}
                            <h1 className="f3 pa3 ma3 white"> Welcome {userInfo.display_name} </h1>
                        </div>
                        <div className="now-playing__img ">
                            <img alt={backgroundImage} src={backgroundImage} />
                        </div>
                        <div className="now-playing__side">
                            <div className="now-playing__name white">{songName}</div>
                            <div className="now-playing__artist white">{artistName}</div>
                        </div>
                        {/* <div className="background" style={backgroundImage} />{" "} */}
                        <div>
                            <button onClick={() => props.onPrevClick()}>Previous</button>
                            <button onClick={() => props.onPlayClick()}>{playing ? 'Pause' : 'Play'}</button>
                            <button onClick={() => props.onNextClick()}>Next</button>
                        </div>
                        <div className="white f3"></div>
                        {loading ? (
                            <DotLoader css={override} size={150} color={'#123abc'} loading={loading} />
                        ) : (
                            <Moods userId={userInfo.id} playlists={usersPlaylists} token={token} />
                        )}
                    </div>
        </div>
    );
};

export default Player;
