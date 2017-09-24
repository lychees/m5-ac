var express = require('express')
var router = express.Router()
var core = require('./core')
var url = require('./url')

for (prop in url) {
    router.post(url[prop], core[prop])
}

module.exports = router;