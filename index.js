require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const routerLogin = require('./router/login')
const routerRefreshToken = require('./router/refreshToken')
const routerCallback = require('./router/callback')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(cookieParser())
app.use(routerLogin)
app.use(routerRefreshToken)
app.use(routerCallback)
//serve static files from React app
app.use(express.static(path.join(__dirname, 'react-client/build')));

let server = app.listen(process.env.PORT || 3001, 
  function(){
    let host = server.address().address;
    let port = server.address().port;
    console.log('my app is running at http://%s:%s', host, port)
  })