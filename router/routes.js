require('dotenv').config()
const express = require('express')
const axios = require('axios').default;
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = express.Router()
// The querystring module provides utilities for parsing and formatting URL query strings 
const querystring = require('querystring')
// generates random string to validate response from spitify to the call we actually gave
const uuidv4 = require('uuid').v4
const spotify = require('./spotify')

let redirect_uri = process.env.REDIRECT_URI || 'http://localhost:3000/callback';
let frontEndUri = process.env.FRONTEND_URI || 'http://localhost:3000/'

let refresh_token;
  // console.log('redirect uri:', redirect_uri)
  const refreshTokenChecker = (refresh_token) => {
    return spotify.post('token',  querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
      redirect_uri
    }))
  }

const redirectUriForTokens = (access_token, refresh_token)=> {
  return (frontEndUri + '?' + querystring.stringify({
    access_token: access_token,
    refresh_token: refresh_token,
  }))
}

const session = require('express-session')
const TWO_HOURS = 1000 * 60 * 60 * 2 //MAX time for a cookie 
const {
  SESS_NAME = 'sid', //session id
  SESS_SECRET = 'MoodLifter',
  SESS_LIFETIME = TWO_HOURS,
} = process.env

// const IN_PROD = process.env.NODE_ENV === "production"

if (router.get('env') === 'production') {
  // Use secure cookies in production (requires SSL/TLS)
  sess.cookie.secure = true;
  // "able to verify authorization request state"
  router.set('trust proxy', 1);
}
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))
router.use(cors())
router.use(cookieParser())
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

  // pseudocode for new process:
  // 1. check if our session cookie exists, and has a refresh token
  console.log('login request for cookie session', req.session.refresh_token)
  if(req.session.refresh_token){
    console.log('about to call refreshTokenChecker')
    refreshTokenChecker(req.session.refresh_token)
    .then((response)=>{
      console.log('***************************** \ninside .then after completing refreshTokenChecker function')
      res.redirect(redirectUriForTokens(response.data.access_token, response.data.refresh_token))
    })
  }else {
    const state = uuidv4(); //generate random string
      // res.cookie(stateCookie, state) //setting a cookie
      req.session.state = state //setting a cookie
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
  }
})
router.get('/callback', function(req, res) {
  // console.log('/callback req:', req)
  console.log('inside callback session is:', req.session)

  console.log( 'in /callback res:')
  //moodLifter requesting refresh and access tokens after checking state parameter
  let code = req.query.code || null;
  let state = req.query.state || null;
  // let storedState = req.cookies ? req.cookies[stateCookie] : null;
  let storedState = req.session.state || null;

  
  if(state === null || state !== storedState){
    console.log('inside if statement')
    return res.redirect(frontEndUri + '?' + querystring.stringify({
      error: 'state_mismatch'
    }))
  }
  console.log('after if statement about to post token')
  spotify.post('token',  querystring.stringify({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirect_uri
  }))
  .then((response) =>{

    console.log('after token posted /callback res:', response.data)
    let access_token = response.data.access_token;
    let refresh_token = response.data.refresh_token;
    req.session.access_token = access_token;
    req.session.refresh_token = refresh_token;
    const temp = redirectUriForTokens(access_token, refresh_token)
    console.log('data from redirectURIForToken', temp, req.session)
    //get rid of access token for security purposes 
    res.redirect(redirectUriForTokens(access_token, refresh_token))
  })
  .catch((err) =>{
    console.error(
      'config data', err.config.data, 
      '\nrequest header',err.request._header, 
      '\n response status', err.response.status, 
      '\n response statusText', err.response.statusText,
      '\n response data', err.response.data )
    res.redirect(frontEndUri + '?' + querystring.stringify({
      error: 'invalid_token'
    }));
  })
})



router.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  console.log('inside refresh token backend', {...req.session, cookie: null})
  let refresh_token = req.session.refresh_token;
  if (refresh_token){
    refreshTokenChecker(refresh_token)
    .then((resp)=>{
      // console.log('inside .then refresh token checker resp:', resp, 'res.data', resp.data, 'resp status', resp.statusCode)
      if(resp.status === 200){
        let access_token = resp.data.access_token;
        res.send({
          'access_token': access_token
        });
      }else {
        res.statusCode = 500 
        res.send({
          'error': 'error debug me'
        })
      }
    })
  }

});

module.exports = router;