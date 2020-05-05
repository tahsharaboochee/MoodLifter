require('dotenv').config()
const express = require('express')
const axios = require('axios').default;
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

spotify.defaults.headers.common['Authorization'] = 'Basic ' + (Buffer.from(
  process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
).toString('base64'))

spotify.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

let frontEndUri = process.env.FRONTEND_URI || 'http://localhost:3000/'

let redirect_uri = process.env.REDIRECT_URI || 'http://localhost:3000/callback';

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(cookieParser())

const IN_PROD = process.env.NODE_ENV === "production"
//serve static files from React app
app.use(express.static(path.join(__dirname, 'react-client/build')));
app.use(session({
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

//put all api endpoints under '/api
app.get('/debug', (req, res) => {
  req.session.foo = (req.session.foo || 0) + 1; 
  res.type('txt')
  .send(req.session)
})
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/react-client/build/index.html'))
})

//login temp 
app.get('/loginTemp', function(req, res){
  req.session.save(err => {
    console.log("req.session.save error:", err);
    console.log('inside login temp session is', req.session)
    // res.redirect('http://localhost:3000/login')
    if(!err){
      res.redirect('/')
    }
  });

})
app.get('/login', function(req, res) {
  // console.log('inside app.get spotifiy client id:', process.env.SPOTIFY_CLIENT_ID)
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
app.get('/callback', function(req, res) {
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



app.get('/refresh_token', function(req, res) {

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

let server = app.listen(process.env.PORT || 3001, 
  function(){
    let host = server.address().address;
    let port = server.address().port;
    console.log('my app is running at http://%s:%s', host, port)
  })