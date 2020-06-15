const express = require('express')
const router = express.Router()
const querystring = require('querystring')
const uuidv4 = require('uuid').v4
const TWO_HOURS = 1000 * 60 * 60 * 2 //MAX time for a cookie 
const {
  SESS_NAME = 'sid', //session id
  SESS_SECRET = 'MoodLifter',
  SESS_LIFETIME = TWO_HOURS,
} = process.env

const IN_PROD = process.env.NODE_ENV === "production"

if (app.get('env') === 'production') {
  // Use secure cookies in production (requires SSL/TLS)
  sess.cookie.secure = true;
  // "able to verify authorization request state when deployed to heroku"
  app.set('trust proxy', 1);
}