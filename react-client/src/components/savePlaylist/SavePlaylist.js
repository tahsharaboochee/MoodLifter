import React from 'react';
import { setPlaylist } from '../../helpers/api-fetcher';
const SavePlaylist = (props) => {
    const { token, playlists } = props;
    const onClick = () => {
        let moodLifterCreatedPlaylists = playlists;

        // if (!playlists['setPlaylistExist']) {
        for (let mood in moodLifterCreatedPlaylists) {
            setPlaylist(moodLifterCreatedPlaylists[mood]['id'], token, moodLifterCreatedPlaylists[mood]['uris']);
        }
        // }
        props.onSavePlaylistClick();
    };
    return (
        <button className="btn btn--playlist" onClick={onClick}>
            Save playlists to Spotify
        </button>
    );
};

export default SavePlaylist;
