let url = require('url')
let fs = require('fs')
let imagesDB = []
let qs = require('querystring')
let multiparty = require('multiparty')
let path = require('path')
let multer = require('multer')
let upload = multer({ dest: 'content/' })


let isPrivate = false;

let addImages = (newItem) => {
  // let obj = {}
  if (newItem) {
    if (newItem.image_name !== '' && newItem.url !== '')
    {
      imagesDB.push(newItem)
    }
  }
  console.log(imagesDB)
}
let isEmptyValue = (value) => {
  let isEmpty = false
  if (value !== '' && value !== null) {
    isEmpty = true
  }
  return isEmpty
}
let getAllImages = (images) => {
  let resultImages = ''
  for (let obj of images) {
    resultImages += `<img src="${obj.img_url}" alt="${obj.name}" ></br>`
  }
  return resultImages
}
let cryptoUrl = (filename) => {
  return (new Buffer(filename).toString('base64'))
}
let decryptoUrl = (value) => {
  return (new Buffer(value, 'base64').toString('ascii'))
}
let getFolder = (value) => {
  return value ? '/content/private/' : '/content/public/'
}
module.exports = function (req, res) {
  req.pathname = req.pathname || url.parse(req.url).pathname
  if (req.pathname === '/submit') {
    let form = new multiparty.Form()
    var obj = {}
    obj.isPrivate = 'off'
    obj.image_name = ''
    form.on('part', part => {
      if (part.filename) { // file
        let body = ''
        part.setEncoding('binary')
        part.on('data', (data) => { body += data })
        part.on('end', () => {
          // private public function
          var destinationFolder = (isPrivate) ? './content/private/' : './content/public/'
              var filename = (isPrivate) ? `${cryptoUrl(part.filename)}` : `${part.filename}`
  
          var wstream = fs.createWriteStream(destinationFolder + filename)
          console.log(body)
          wstream.write(body, 'binary')
          wstream.end()
          res.write('Uploaded')
        })
      } else { // text
        let body = ''
        part.on('data', function (chunk) {
          body += chunk
          if (part.name === 'isPrivate' && body === 'on') {
            isPrivate = true;
          }
          console.log(body)
        })
        part.on('end', function () {
          obj[part.name] = body
        })
      }

    })
    form.on('close', () => {
      console.log('Upload completed!')
      addImages(obj)
      res.end()
    })
    form.parse(req)
  } else { return true }
}
