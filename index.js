let http = require('http')
let fs = require('fs')
let url = require('url')
let handlers = require('./handlers/index')
 let submit = require('./handlers/submit')
let port = 8080

http
    .createServer((req, res) => {
      if (req.url === '/submit') {
        var body = []
        let obj = {}
        req.on('data', function (chunk) {
          body += chunk
        }).on('end', function () {
          body =  JSON.stringify(body)
          body = body.split('&')
            submit.addImages(body)
          // at this point, `body` has the entire request body stored in it as a string
        });
      
      }
      for (let handler of handlers) {
        let next = handler(req, res)
        if (!next) break
      }
    })
.listen(port)
console.log(`Server listening to port ${port}`)


