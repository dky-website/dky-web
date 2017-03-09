var express = require('express');
var Constant = require('../utils/const');
var rocket = require('../utils/rocket');
var router = express.Router();

/* GET product listing. */
router.get('/', function(req, res) {

    res.render('product', {
        title: '旦可韵 - product',
        menu: 'product',

        root: Constant.WEB_ROOT
    });
});

module.exports = router;
