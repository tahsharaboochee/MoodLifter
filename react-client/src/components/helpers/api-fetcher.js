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

  export function usersTopArtist(token){
    const artistOrTrack = 'artists';
    const endpoint = `https://api.spotify.com/v1/me/top/${artistOrTrack}`;
    fetch(endpoint, {
      method: "GET",
      headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
      }
    }).then(async resp => {
      console.log('usersTopArtist', resp)
      if (resp.ok) {
        const topArtistJson = await resp.json()
        console.log('usersTopArtist', topArtistJson)
        // return resp.json();
      } else {
        throw new Error(
          `😩 fetch(${endpoint}) failed: Express server responded with HTTP ${resp.status} ${resp.statusText}. (Note: this error is custom to Booktonica and you cannot Google it). Check your Network console for more information about the request and the Express logs for more information about the response.`
        );
      }
    });
  }

