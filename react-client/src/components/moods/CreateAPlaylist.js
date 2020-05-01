import React, { useState, useEffect } from 'react';
import { createPlaylist } from '../helpers/api-fetcher';
import Feeling from './Feeling';

const CreatePlaylist = (props) => {
    // console.log(props);
    // console.log('userId:', props.userId)
    const [playlistId, setPlaylistId] = useState({});
    const { userId, playlists, token, sad } = props;

    //   useEffect(() => {
    //
    //   });
    return (
        <div>
            <Feeling playlist={playlistId} sad={props.sad} />
        </div>
    );
};

export default CreatePlaylist;
