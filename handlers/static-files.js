let fs = require('fs')
let url = require('url')

module.exports = function (req, res) {
  req.pathname = req.pathname || url.parse(req.url).pathname
  fs.readFile('.' + req.pathname, (err, data) => {
    if (err || !isAcceptedExtension(req.pathname)) {
      res.writeHead(404)
      res.write('404 not found')
      res.end()
      return true
    }

    let contetType = getContentType(req.pathname)

    res.writeHead(200, {
      'Content-Type': contetType
    })
    res.write(data)
    res.end()
  })
}

let getContentType = (url) => {
  let contetType = 'text/plain'
  if (url.endsWith('.css')) {
    contetType = 'text/css'
  } else if (url.endsWith('.js')) {
    contetType = 'application/javascript'
  } else if (url.endsWith('.jpg')) {
    contetType = 'image/jpeg'
  }

  return contetType
}

let isAcceptedExtension = (url) => {
  let acceptedFiles = [
    '.css',
    '.js',
    '.html',
    '.jpg'
  ]
  var fileExtensionPatter = /\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/
  let fileType = url.match(fileExtensionPatter)[0]
  if (url.startsWith('/content')) {
    for (let file of acceptedFiles) {
      if (file === fileType) return true
    }
  }
  return false
}
