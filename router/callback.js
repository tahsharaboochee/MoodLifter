const express = require('express')
const router = express.Router()
const axios = require('axios').default;
const spotify = require('./spotify')

//name of cookie
const stateCookie = 'spotify_auth_state'
let redirect_uri = process.env.REDIRECT_URI || 'http://localhost:3000/callback';
let frontEndUri = process.env.FRONTEND_URI || 'http://localhost:3000/';

router.get('/callback', function(req, res) {
    // console.log('/callback req:', req)
    console.log('inside callback session is:', req.session)
  
    console.log( 'in /callback res:')
    //moodLifter requesting refresh and access tokens after checking state parameter
    let code = req.query.code || null;
    let state = req.query.state || null;
    let storedState = req.cookies ? req.cookies[stateCookie] : null;
    // let storedState = req.session.state || null;
  
    
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
  

module.export =router; 