const app = require('./src/app')
const http = require('http')
const config = require('./src/config')


const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})