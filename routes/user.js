var express = require('express');
var Constant = require('../utils/const');
var rocket = require('../utils/rocket');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    // rocket.get(Constant.API_HOST + '/website-web/front/banner/list').then(function(data) {
    //     console.warn('promise', data);
    // })
    res.send('respond with a resource.');
});

module.exports = router;
