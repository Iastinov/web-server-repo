
let favicon = require('./favicon')
let homePage = require('./home-page')
let staticFiles = require('./static-files')
let readdir = require('./readdir')
let submit = require('./submit')


module.exports = [

  favicon,
  homePage,
  readdir,
  submit,
  staticFiles
]
