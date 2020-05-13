import React, {useEffect} from 'react';
import { css } from '@emotion/core';
import DotLoader from 'react-spinners/DotLoader';
import Moods from '../moods/Moods';
import './Player.css';
import {
    Col,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardHeader,
    CardTitle,
    CardSubtitle,
    CardFooter
  } from "reactstrap";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: black;
`;

const Player = (props) => {

    const { userInfo, artistName, songName, playing, backgroundImage, usersPlaylists, token, loading } = props.state;
    console.log('playing', playing)
    return (
        <div>
         <Card 
          style={{
            border: '5px solid black',
            boxSizing: "border-box",
            textAlign: 'center',
            color: 'white',
            backgroundColor: '2B2D2F'
        }}
        > 
          <CardHeader> 
          {loading ? (
                    <DotLoader css={override} size={150} color={'#123abc'} loading={loading} />
                ) : (
                    <Moods userId={userInfo.id} playlists={usersPlaylists} token={token} />
                )}
          </CardHeader>
          {
            playing || !loading ? 
            <div>
                    <CardTitle>{songName} by: {artistName}</CardTitle> 
                <CardBody>
                    <CardImg
                        className=""
                        src={backgroundImage}
                        alt="album cover"
                    />
                </CardBody>
                <CardFooter>
                    <button className='f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4' 
                        onClick={() => props.onPrevClick()}> Previous </button>
                        <button onClick={() => props.onPlayClick()}>{playing ? 'Pause' : 'Play'}</button>
                        <button onClick={() => props.onNextClick()}>Next</button>
                </CardFooter>
            </div>
            : ' '
          }
        </Card>
        </div>
    );
};

export default Player;
