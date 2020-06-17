import React, { useState, useEffect } from 'react';
import Moods from '../moods/Moods';
import Player from '../player/Player';

const SelectMoodOrPlayMood = (props) => {
    const { playlistPlaying } = props.state;

    return (
        <div>
            {playlistPlaying ? (
                <div
                    style={{
                        textAlign: 'center',
                        color: 'white',
                    }}
                >
                    <Player
                        state={props.state}
                        onPrevClick={props.onPrevClick}
                        onNextClick={props.onNextClick}
                        onPlayClick={props.onPlayClick}
                        onPlaylistClick={props.onPlaylistClick}
                    />
                </div>
            ) : (
                <div
                    className="centered"
                    style={{
                        textAlign: 'center',
                    }}
                >
                    <Moods
                        userName={props.userName}
                        userId={props.userId}
                        playlists={props.playlists}
                        playlistPlaying={props.playlistPlaying}
                        token={props.token}
                        playing={props.playing}
                        onPlaylistClick={props.onPlaylistClick}
                    />
                </div>
            )}
        </div>
    );
};

export default SelectMoodOrPlayMood;
