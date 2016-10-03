let fs = require('fs')
let url = require('url')
var zlib = require('zlib');

module.exports = function (req, res) {
  req.pathname = req.pathname || url.parse(req.url).pathname
  if (req.pathname === '/content/public/') {
    let body = '<div>'
    fs.readdir('.' + req.pathname, (err, files) => {
      if (err) {
        res.writeHead(404)
        res.write('404 not found')
        res.end()
      } else {
        for (var i = 0; i < files.length; i++) {
          body += `<img src="${req.pathname + files[i]}" alt="alt">`
          console.log(files[i])
        }
        body += '</div>'
        res.writeHead(200, {
          'Content-Type': 'text/html',
          'Content-Encoding': 'gzip'
          
        })
        var wstream = fs.createWriteStream(body)
        res.pipe(zlib.createGzip()).pipe(wstream)
        res.end()
      }
    })
  } else {
    return true
  }
}
