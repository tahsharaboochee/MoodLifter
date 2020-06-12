import React, { useState, useEffect } from 'react';
// import Moods from '../moods/Moods';
import PlayButtons from '../playButtons/PlayButtons';
import { Card, CardImg, CardBody, CardHeader, CardTitle, CardFooter } from 'reactstrap';

const Player = (props) => {
    const [onBackClick, setOnBackClick] = useState(false);
    const backClick = () => {
        setOnBackClick(!onBackClick);
        props.onPlayClick();
        props.onPlaylistClick();
    };

    const { userInfo, artistName, songName, backgroundImage, usersPlaylists, token, loading, playing } = props.state;

    return (
        <div>
            <Card>
                <CardHeader>
                    <button className="btn btn--playlist" onClick={backClick}>
                        Click a different Mood
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
