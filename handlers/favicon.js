let fs = require('fs')
let url = require('url')

module.exports = function (req, res) {
  let parsedURL = req.pathname || url.parse(req.url).pathname
  if (parsedURL === '/content/favicon.ico') {
    fs.readFile('./content/favicon.ico', (err, data) => {
      if (err) console.log(err)
      res.writeHead(200)
      res.write(data)
      res.end()
    })
  } else { return true }
}
