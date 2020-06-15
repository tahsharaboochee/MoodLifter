const express = require('express')
const router = express.Router()
const querystring = require('querystring')
const uuidv4 = require('uuid').v4
const axios = require('axios').default;
const spotify = require('./spotify')
// const spotify = axios.create({
//     baseURL: 'https://accounts.spotify.com/api/',
//   })

// spotify.defaults.headers.common['Authorization'] = 'Basic ' + (Buffer.from(
//     process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
//   ).toString('base64'))
  
// spotify.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

let frontEndUri = process.env.FRONTEND_URI || 'http://localhost:3000/'

//name of cookie
const stateCookie = 'spotify_auth_state'

const redirectUriForTokens = (access_token, refresh_token)=> {
  return (frontEndUri + '?' + querystring.stringify({
    access_token: access_token,
    refresh_token: refresh_token,
  }))
}

router.get('/login', function(req, res) {
  //spotify getting moodLifter authorization
    const state = uuidv4(); //generate random string
      res.cookie(stateCookie, state) //setting a cookie
      // req.session.state = state //setting a cookie
      console.log('about to redirect to spotify state:', state)
      res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id: process.env.SPOTIFY_CLIENT_ID,
          scope: 'streaming playlist-read-collaborative user-read-private user-read-email user-read-playback-state user-top-read user-read-currently-playing user-library-read playlist-modify-public playlist-modify-private user-follow-read',
          state: state,
          redirect_uri
        })
      )
    console.log('___________________________________\nredirect to spotify completed')
})

module.export = router; 