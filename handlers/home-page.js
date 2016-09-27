let fs = require('fs')
let url = require('url')

module.exports = function (req, res) {
  req.pathname = req.pathname || url.parse(req.url).pathname
  if (req.pathname === '/') {
    fs.readFile('./index.html', (err, data) => {
      if (err) console.log(err)

      res.writeHead(200, {
        'content-type': 'text/html'
      })
      res.write(data)
      res.end()
    })
  } else { return true }
}
