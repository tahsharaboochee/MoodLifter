import React, {useState, useEffect} from 'react';
import { css } from '@emotion/core';
import DotLoader from 'react-spinners/DotLoader';
import Moods from '../moods/Moods';
import PlayButtons from '../playButtons/PlayButtons'
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
    const [onPlayListClick, setOnPlayListClick] = useState(false)
    useEffect (()=>{
        console.log('before if statement in useEffect', props.state.playing, 'playlist clicked', onPlayListClick)
        if(!props.state.playing){
            console.log('inside if statement')
            setOnPlayListClick(!onPlayListClick)
        }
        console.log('after if statement', props, 'playlist clicked', onPlayListClick)
    }, [])
    const playlistPlaying = () => {
        setOnPlayListClick(!onPlayListClick)
      }

    const { userInfo, artistName, songName, playing, backgroundImage, usersPlaylists, token, loading } = props.state;
    // console.log('playing', playing, userInfo)
    return (
        <div className='center pa3 mr4 mw5 mw7-ns ph5-ns'>
         <Card 
          style={{
            // border: '5px solid #555555',
            // boxSizing: "border-box",
            textAlign: 'center',
            color: 'white',
            margin: 'auto'
            // backgroundColor: '2B2D2F'
        }}
        > 
          <CardHeader> 
          {loading ? (
                    <DotLoader css={override} size={150} color={'#123abc'} loading={loading} />
                ) : (
                    <Moods userName={userInfo.display_name} userId={userInfo.id} playlists={usersPlaylists} playlistPlaying={playlistPlaying} token={token} />
                )}
          </CardHeader>
          {
           onPlayListClick && !loading ? 
            <div>
                    <CardTitle>{songName} by: {artistName}</CardTitle> 
                <CardBody>
                    <CardImg
                        className=""
                        src={backgroundImage}
                        alt="album cover"
                        // style={{
                        //     border: '1px solid #555555',
                        //     boxSizing: "border-box",
                        // }}
                    />
                </CardBody>
                <CardFooter>
                   <PlayButtons state={props.state} 
                    onPrevClick={props.onPrevClick}
                    onNextClick={props.onNextClick}
                    onPlayClick={props.onPlayClick}
                   />
                </CardFooter>
            </div>
            : ' '
          }
        </Card>
        </div>
    );
};

export default Player;
