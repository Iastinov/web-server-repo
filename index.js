let http = require('http')
let fs = require('fs')
let url = require('url')
let handlers = require('./handlers/index')
let port = 8080

http
    .createServer((req, res) => {
      for (let handler of handlers) {
        console.log(handler)
        let next = handler(req, res)
        if (!next) break
      }
    })
.listen(port)
console.log(`Server listening to port ${port}`)

