    export function transferPlaybackToMoodLifter(deviceId, token){
      fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "device_ids": [ deviceId ],
        "play": true,
      }),
    })
  }

  export const fetchUser = (token) => {
    return fetch('https://api.spotify.com/v1/me', {
        method: "GET",
        headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
        }
      }).then(async res => {
        // send user back to homepage if no token
        if(res.statusText === "Unauthorized") {
          window.location.href = './';
        }
        const userInfo = await res.json()
        return userInfo
      })
      .catch(err => {
        console.error(err);
      });
    };

  export function usersTopArtistsOrSongs(token, type){
    const artistOrTrack = type;
   
    const endpoint = `https://api.spotify.com/v1/me/top/${artistOrTrack}?limit=50`;
    return fetch(endpoint, {
      method: "GET",
      headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
      }
    }).then(async resp => {
      if (resp.ok) {
        let topArtistOrSongs = await resp.json()
        return topArtistOrSongs
    

      } else {
        throw new Error(
          `😩 fetch(${endpoint}) failed: Express server responded with HTTP ${resp.status} ${resp.statusText}. (Note: this error is custom to MoodLifter and you cannot Google it). Check your Network console for more information about the request and the Express logs for more information about the response.`
        );
      }
    })
  }
