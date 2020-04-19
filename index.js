require('dotenv').config()
const express = require('express')
const axios = require('path')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
//The querystring module provides utilities for parsing and formatting URL query strings 
const querystring = require('querystring')
//generates random string to validate response from spitify to the call we actually gave
const uuidv4 = require('uuid').v4
const spotify = axios.create({
  baseURL: 'https://accounts.spotify.com/api/',
})
const TWO_HOURS = 1000 * 60 * 60 * 2 //MAX time for a cookie 
const {
  SESS_NAME = 'sid', //session id
  SESS_SECRET = 'MoodLifter',
  SESS_LIFETIME = TWO_HOURS,
} = process.env

//name of cookie
const stateCookie = 'spotify_auth_state'

spotify.defaults.headers.common['Authorization'] = 'Basic' + (Buffer.from(
  process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
).toString('base64'))

spotify.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

let frontEndUri = process.env.FRONTEND_URI || 'http://localhost:3000'

let redirect_uri = process.env.REDIRECT_URI || 'http://localhost:3000/callback';

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(cookieParser())
app.use(session())

//serve static files from React app
app.use(express.static(path.join(__dirname, 'react-client/build')));
app.use(session({
  name: SESS_NAME,
  secret: SESS_SECRET,
  access_token: null, 
  refresh_token: null,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: SESS_LIFETIME,
    sameSite: true
  }
}))


const redirectUriForTokens = (access_token, refresh_token)=> {
  return (frontEndUri + querystring.stringify({
    access_token: access_token,
    refresh_token: refresh_token,
  }))
}

//put all api endpoints under '/api
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/react-client/build/index.html'))
})

}
app.get('/login', function(req, res) {
  // console.log('inside app.get spotifiy client id:', process.env.SPOTIFY_CLIENT_ID)
  //spotify getting moodLifter authorization

  // pseudocode for new process:
  // 1. check if our session cookie exists, and has a refresh token
  console.log('login request for cookie session', req.session)
  if(req.session.refresh_token){
    refreshTokenChecker(req.session.refresh_token)
    .then((res, body)=>{
      return res.redirect(redirectUriForTokens(body.access_token, body.refresh_token))
    })
  }
  // 2. if so:
  //   a. try calling /api/token 
  //   b. if we get new tokens, we're done; go to 5.
  //   c. if not, go to 3
  // 3. if not, or if getting new tokens failed:
  // 4. redirect the user to spotify/authorize (as below)
  // 5. either in /callback from 4, or as the result of 2.b.:
  //   a. set session cookies with new(ly refreshed) tokens
  //   b. send tokens to frontend

  const state = uuidv4(); //generate random string
  res.cookie(stateCookie, state) //setting a cookie
  res.redirect('https://accounts.spotify.com/authorize?' +
  querystring.stringify({
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope: 'streaming user-read-private user-read-email user-read-playback-state user-top-read user-read-currently-playing user-library-read playlist-modify-public user-follow-read',
    state: state,
    redirect_uri
  }))
})

app.get('/callback', function(req, res) {
  // console.log('/callback req:', req)
  // console.log( '/callback res:', res)
  //moodLifter requesting refresh and access tokens after checking state parameter
  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies[stateCookie] : null;
  
  if(state == null || state !== storedState){
    return res.redirect(frontEndUri + querystring.stringify({
      error: 'state_mismatch'
    }))
  }
  spotify.post('token',  querystring.stringify({
    grant_type: "authorization_code",
    code: code,
    redirect_uri
  }))
  .then((res) =>{

    console.log('/callback res:', res.data)
    let access_token = body.access_token;
    let refresh_token = body.refresh_token;
    req.session.access_token = access_token;
    req.session.refresh_token = refresh_token;

  res.redirect(redirectUriForTokens(access_token, refresh_token))
  })
  .catch((err) =>{
    console.error(err)
    res.redirect(frontEndUri + '?' + querystring.stringify({
      error: 'invalid_token'
    }));
  })
})



app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  let refresh_token = req.query.refresh_token;
  refreshTokenChecker(refresh_token)
  .then((res, body)=>{
    if(res.statusCode === 200){
      let access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  })

});

let server = app.listen(process.env.PORT || 3001, 
  function(){
    let host = server.address().address;
    let port = server.address().port;
    console.log('my app is running at http://%s:%s', host, port)
  })