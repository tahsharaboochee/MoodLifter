import React, { useState, useEffect } from "react";
import { createPlaylist } from "../helpers/api-fetcher";
import Feeling from "./Feeling";

const CreatePlaylist = (props) => {
  // console.log('userId:', props.userId)
  const [playlistId, setPlaylistId] = useState({});
  const [playlistsRecentlyCreated, setPlaylistsRecentlyCreated] = useState({});
  const [calledCreatePlaylist, setCalledCreatePlaylist] = useState(false);
  const { userId, playlists, token, sad } = props;
  const playlist = [
    "example1",
    "Sad Music MoodLifter",
    "Happy Music MoodLifter",
    "Angry Music MoodLifter",
  ];
  const allUsersPlaylist = Object.values(playlists)[0];
  if (userId && allUsersPlaylist) {
    useEffect(() => {
      //     If exist
      if (!calledCreatePlaylist) {
        playlistInfo("testing123", allUsersPlaylist);
        // playlist.forEach((list) => playlistInfo(list, allUsersPlaylist))
        console.log(
          "userId:",
          userId,
          "playlistId:",
          playlistId,
          "playlistRecentlyCreated:",
          playlistsRecentlyCreated
        );
        setCalledCreatePlaylist(false);
      } else {
        console.log("called create playlist already");
      }
    });
  }

  // const listOfPlaylist = Object.values(playlists)[0]
  // console.log('listOfPlaylist', listOfPlaylist)
  const playlistInfo = (playlistToFind, allUsersPlaylist) => {
    if (playlistsRecentlyCreated[playlistToFind] === true) {
      // console.log('list already exist', playlistsRecentlyCreated)
      return false;
      // console.log('list Of playlist',listOfPlaylist.includes('example1'))
    }
    // console.log(allUsersPlaylist[playlistToFind])
    if (allUsersPlaylist[playlistToFind] !== undefined) {
      console.log(
        "playlist exist",
        playlistToFind,
        allUsersPlaylist[playlistToFind]
      );
      setPlaylistId({
        ...playlistId,
        [playlistToFind]: allUsersPlaylist[playlistToFind],
      });
      return true;
    } else {
      console.log(
        "playlist doesnt exist",
        "\n key playlist name:",
        playlistToFind,
        "value track id:",
        allUsersPlaylist[playlistToFind],
        "playlist",
        allUsersPlaylist
      );
      // Create(post) the playlist sad, happy and angry

      createPlaylist(userId, token, playlistToFind).then(async (info) => {
        console.log(
          "userId",
          userId,
          "creating playlist",
          playlistToFind,
          info
        );
        let id = info.id;
        let name = info.name;
        await setPlaylistId({
          ...playlistId,
          [name]: id,
        });
        console.log(
          "set playlist",
          playlistId,
          "playlist name:",
          name,
          "playlist id:",
          id
        );
      });
      setPlaylistsRecentlyCreated({
        ...playlistsRecentlyCreated,
        [playlistToFind]: true,
      });

      // Fetch post to add the song to playlist
      // Fetch playlist by the id
      // Play the list
    }
  };
  return (
    <div>
      <Feeling playlist={playlistId} />
    </div>
  );
};

export default CreatePlaylist;
