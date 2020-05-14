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
    const [onBackClick, setOnBackClick] = useState(false)
    useEffect (()=>{
        console.log('before if statement in useEffect', props.state.playing, 'playlist clicked', onPlayListClick, 'back clicked', onBackClick)
        if(!props.state.playing){
            console.log('inside if statement')
            setOnPlayListClick(!onPlayListClick)
        }

        console.log('after if statement', props, 'playlist clicked', onPlayListClick, '')
    }, [])

    const playlistPlaying = () => {
        setOnPlayListClick(!onPlayListClick)    
      }
    const backClick = () => {
        setOnBackClick(!onBackClick)
        setOnPlayListClick(!onPlayListClick)  
        props.onPlayClick() 
      }


    const { userInfo, artistName, songName, playing, backgroundImage, usersPlaylists, token, loading } = props.state;
    console.log('playing', playing, userInfo, 'back clicked', onBackClick)
    return (
        <div className='center centered pa3 mr4 mw5 mw7-ns ph5-ns'>
         <Card 
          style={{
            // border: '5px solid #555555',
            // boxSizing: "border-box",
            textAlign: 'center',
            color: 'white',
            // margin: 'auto'
            // backgroundColor: '2B2D2F'
        }}
        > 
            { loading ? 
                <h2>It is Loading.</h2>
                  : !onPlayListClick ? 
                 <div>
                    <h2>playing music</h2> 
                    <button className='btn btn--playlist'
                        onClick={backClick}
                    >
                        back
                    </button>
                 </div> 
                  :
                  <Moods userName={userInfo.display_name} userId={userInfo.id} playlists={usersPlaylists} playlistPlaying={playlistPlaying} token={token} />
            }
          {/* <CardHeader> 
          {loading ? (
                    <DotLoader css={override} size={150} color={'#123abc'} loading={loading} />
                    <DotLoader css={override} size={150} color={'#123abc'} loading={loading} />
                ) : (
                    <Moods userName={userInfo.display_name} userId={userInfo.id} playlists={usersPlaylists} playlistPlaying={playlistPlaying} token={token} />
                )}
          </CardHeader> */}
          {/* {
            onBackClick ? 
            <div>
                <CardHeader>
                    <button className='btn btn--playlist'
                        onClick={backClick}
                    >
                        back
                    </button>
                </CardHeader>
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
             : <Moods userName={userInfo.display_name} userId={userInfo.id} playlists={usersPlaylists} playlistPlaying={playlistPlaying} token={token} />
          } */}
        </Card>
        </div>
    );
};

export default Player;
