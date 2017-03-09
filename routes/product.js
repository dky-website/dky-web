var express = require('express');
var Constant = require('../utils/const');
var rocket = require('../utils/rocket');
var router = express.Router();

/* GET product listing. */
router.get('/', function(req, res) {
    var jobs = [];
    jobs.push(rocket.get(Constant.WEB_ROOT + '/front/product/queryProductType'));
    jobs.push(rocket.get(Constant.WEB_ROOT + '/front/product/querySeasonList'));
    Promise.all([...jobs]).then(function([typeResult, seasonResult]) {
        console.warn(typeResult, seasonResult, 'xxx')
        var typeResult = JSON.parse(typeResult),
            seasonResult = JSON.parse(seasonResult);
    });
    res.render('product', {
        title: '旦可韵 - product',
        menu: 'product',

        root: Constant.WEB_ROOT
    });
});

module.exports = router;
