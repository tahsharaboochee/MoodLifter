const axios = require('axios').default;

const spotify = axios.create({
    baseURL: 'https://accounts.spotify.com/api/',
  })

spotify.defaults.headers.common['Authorization'] = 'Basic ' + (Buffer.from(
    process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
  ).toString('base64'))
  
spotify.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

module.export = spotify;