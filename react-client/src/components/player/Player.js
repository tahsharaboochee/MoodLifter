import React, { useState, useEffect } from 'react';
import { pause } from '../../helpers/api-fetcher';
import PlayButtons from '../playButtons/PlayButtons';
import { Card, CardImg, CardBody, CardHeader, CardTitle, CardFooter } from 'reactstrap';

const Player = (props) => {
    const backClick = () => {
        pause(props.state.token)
        props.onPlaylistClick();
    };

    const { artistName, songName, backgroundImage } = props.state;

    return (
        <div>
            <Card>
                <CardHeader>
                    <button className="btn btn--playlist" onClick={() => backClick()}>
                        <a className="login white" href="/login">
                            Click a different Mood
                        </a>
                    </button>
                </CardHeader>
                <div className="pa3"></div>
                <CardTitle>
                    {songName} by: {artistName}
                </CardTitle>
                <CardBody>
                    <CardImg src={backgroundImage} alt="album cover" />
                </CardBody>
                <CardFooter>
                    <PlayButtons
                        state={props.state}
                        onPrevClick={props.onPrevClick}
                        onNextClick={props.onNextClick}
                        onPlayClick={props.onPlayClick}
                    />
                </CardFooter>
            </Card>
        </div>
    );
};

export default Player;
