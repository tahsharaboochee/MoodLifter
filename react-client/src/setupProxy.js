const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = () => createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  logLevel: 'debug'
  })

module.exports = function(app) {
  app.use('/login', proxy());
  app.use('/callback', proxy());
}
