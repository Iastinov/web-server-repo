let url = require('url')
let fs = require('fs')
let imagesDB = []


let addImages = (newItem) => {
  let obj = {}
  if (newItem) {
    for (var item of newItem) {
      item = item.toString().split('=')
      console.log(item[0])
      console.log(item[1])
      if (item[1] !== '' && item[1] != null) {
        obj[item[0]] = decodeURIComponent(item[1].split('+').join(' '))
        imagesDB.push(obj)
      }
    }

  }
  console.log(imagesDB)
}
let getAllImages = (images) => {
  let resultImages = ''
  for (let obj of images) {
    resultImages += `<img src="${obj.img_url}" alt="${obj.name}" ></br>`
  }
  return resultImages
}
module.exports = function (req, res, event) {
  req.pathname = req.pathname || url.parse(req.url).pathname
  if (req.method === 'POST' && req.pathname === '/submit') {
    var body = []
    req.on('data', function (chunk) {
      body += chunk
    }).on('end', function () {
      body = JSON.stringify(body.replace('"', ''))
      body = body.split('&')
      addImages(body)
            // at this point, `body` has the entire request body stored in it as a string
    })
    //var html = fs.readFileSync('').toString()
    
    fs.readFile('./images.html', (err, data) => {
      if (err) throw err
      console.log(data)
    })
    let immgs = getAllImages(imagesDB)
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.write('<h2>Images was added</h2>')
    res.end()
  } else { return true }
}
