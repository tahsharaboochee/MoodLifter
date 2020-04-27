//get user account information
export const fetchUser = (token) => {
  return fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      // send user back to homepage if no token
      if (res.statusText === "Unauthorized") {
        window.location.href = "./";
      }
      const userInfo = await res.json();
      return userInfo;
    })
    .catch((err) => {
      console.error(err);
    });
};

//connect to spotify's web api automatically
export function transferPlaybackToMoodLifter(deviceId, token) {
  fetch("https://api.spotify.com/v1/me/player", {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      device_ids: [deviceId],
      play: false,
    }),
  });
}

//find the top songs to create playlist based on music user already listens to
export function usersTopArtistsOrSongs(token, type) {
  const artistOrTrack = type;

  const endpoint = `https://api.spotify.com/v1/me/top/${artistOrTrack}?limit=50`;
  return fetch(endpoint, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(async (resp) => {
    if (resp.ok) {
      let topArtistOrSongs = await resp.json();
      return topArtistOrSongs;
    } else {
      console.log("error:", resp.body);
      throw new Error(
        `😩 fetch(${endpoint}) failed: Express server responded with HTTP ${resp.status} ${resp.statusText}. (Note: this error is custom to MoodLifter and you cannot Google it). Check your Network console for more information about the request and the Express logs for more information about the response.`
      );
    }
  });
}

//retrieve the valence to determine the mood of a song
export const fetchAudioFeatures = (token, id) => {
  return fetch(`https://api.spotify.com/v1/audio-features/${id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      // send user back to homepage if no token
      if (res.statusText === "Unauthorized") {
        window.location.href = "./";
      }
      const userInfo = await res.json();
      return userInfo;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const createPlaylist = (userId, token, name) => {
  return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      description: `${name} Playlist`,
    }),
  })
    .then((res) => {
      if (res.statusText === "Unauthorized") {
        window.location.href = "./";
      }
      return res.json();
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getUsersPlaylist = (userId, token) => {
  console.log("userId", userId, "token:", token);
  return fetch(
    `https://api.spotify.com/v1/users/${userId}/playlists?limit=50`,
    {
      method: "Get",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  )
    .then(async (res) => {
      if (res.statusText === "Unauthorized") {
        window.location.href = "./";
      }
      const usersPlaylists = await res.json();
      return usersPlaylists;
    })
    .then((res) => {
      const playlist = [];
      const result = res.items;
      let obj = {};
      result.forEach((list) => {
        let name = list.name;
        let id = list.id;
        obj[name] = id;
      });
      playlist.push(obj);
      console.log(playlist);
      return playlist;
    })
    .catch((err) => {
      console.error(err);
    });
};

//delete a playlist
export const deleteUsersPlaylist = (playlistId, token) => {
  return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).catch((err) => {
    console.error(err);
  });
};
