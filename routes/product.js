var express = require('express');
var Constant = require('../utils/const');
var rocket = require('../utils/rocket');
var router = express.Router();

/* GET product listing. */
router.get('/', function(req, res) {
    var jobs = [];
    jobs.push(rocket.get(Constant.WEB_ROOT + '/front/product/queryProductType'));
    jobs.push(rocket.get(Constant.WEB_ROOT + '/front/product/querySeasonList'));
    jobs.push(rocket.get(Constant.WEB_ROOT + '/front/product/queryProduct'));
    Promise.all([...jobs]).then(function([typeResult, seasonResult, productResult]) {
        //console.warn(typeResult, seasonResult, 'xxx')
        var typeResult = JSON.parse(typeResult),
            seasonResult = JSON.parse(seasonResult),
            productResult= JSON.parse(productResult);

        res.render('product', {
            title: '旦可韵 - product',
            menu: 'product',
            typeList: typeResult.data,
            seasonList: seasonResult.data,
            firstProduct: productResult.data,
            root: Constant.WEB_ROOT
        });
    });

});

module.exports = router;
