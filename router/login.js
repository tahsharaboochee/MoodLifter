const express = require('express')
const router = express.Router()
// The querystring module provides utilities for parsing and formatting URL query strings 
const querystring = require('querystring')
// generates random string to validate response from spitify to the call we actually gave
const uuidv4 = require('uuid').v4
const spotify = require('./spotify')
const callback = require('./callback')

const session = require('express-session')
const TWO_HOURS = 1000 * 60 * 60 * 2 //MAX time for a cookie 
const {
  SESS_NAME = 'sid', //session id
  SESS_SECRET = 'MoodLifter',
  SESS_LIFETIME = TWO_HOURS,
} = process.env

let frontEndUri = process.env.FRONTEND_URI || 'http://localhost:3000/'
let redirect_uri = process.env.REDIRECT_URI || 'http://localhost:3000/callback';

//name of cookie
const stateCookie = 'spotify_auth_state'

const redirectUriForTokens = (access_token, refresh_token)=> {
  return (frontEndUri + '?' + querystring.stringify({
    access_token: access_token,
    refresh_token: refresh_token,
  }))
}

router.use(session({
    genid: (req) => {
      console.log('Inside the session middleware')
      console.log(req.sessionID)
      return uuidv4() // use UUIDs for session IDs
    },
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: true,
      httpOnly: false,  // this must be false if you want to access the cookie
      // secure: IN_PROD
    }
  }))

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

module.exports = router; 