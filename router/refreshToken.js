const express = require('express')
const router = express.Router()
const querystring = require('querystring')
const axios = require('axios').default;
// const routerCallback = require('./callback')
const spotify = axios.create({
    baseURL: 'https://accounts.spotify.com/api/',
  })

spotify.defaults.headers.common['Authorization'] = 'Basic ' + (Buffer.from(
    process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
  ).toString('base64'))
  
spotify.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

let redirect_uri = process.env.REDIRECT_URI || 'http://localhost:3000/callback';

const refreshTokenChecker = (refresh_token) => {
    return spotify.post('token',  querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
      redirect_uri
    }))
  }

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

  module.export = router; 