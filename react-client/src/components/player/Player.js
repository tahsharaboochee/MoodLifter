import React, { useState, useEffect } from 'react';
// import Moods from '../moods/Moods';
import PlayButtons from '../playButtons/PlayButtons';
import './Player.css';
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
        <div className="center centered pa3 mr4 mw5 mw7-ns ph5-ns">
            <Card
                style={{
                    textAlign: 'center',
                    color: 'white',
                }}
            >
                <div>
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
                        <CardImg className="" src={backgroundImage} alt="album cover" />
                    </CardBody>
                    <CardFooter>
                        <PlayButtons
                            state={props.state}
                            onPrevClick={props.onPrevClick}
                            onNextClick={props.onNextClick}
                            onPlayClick={props.onPlayClick}
                        />
                    </CardFooter>
                </div>
            </Card>
        </div>
    );
};

export default Player;
