let url = require('url')
let fs = require('fs')
let imagesDB = []


let addImages = (newItem) => {
    let obj = {}
    if (newItem) {
        for (var item of newItem) {
            item = item.toString().split('=')
            obj[item[0]] = decodeURIComponent(item[1].split('+').join(' '))

        }
        imagesDB.push(obj)
    }
    console.log(imagesDB)
}

module.exports = function (req, res, event) {
    req.pathname = req.pathname || url.parse(req.url).pathname
    if (req.method  === 'POST' && req.pathname === '/submit') {
        var body = []
        let obj = {}
        req.on('data', function (chunk) {
            body += chunk
        }).on('end', function () {
            body = JSON.stringify(body)
            body = body.split('&')
            addImages(body)
            // at this point, `body` has the entire request body stored in it as a string
        });
        var html = fs.readFileSync('index.html').toString();
        res.writeHead(200, {
        'Content-Type': "text/html",
        })
        res.write('<h2>Images was added</h2>')
        res.end(html)
    } else { return true }
}
