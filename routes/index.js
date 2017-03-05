var express = require('express');
var Constant = require('../utils/const');
var rocket = require('../utils/rocket');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
    // req.session.menu = 'index';
    // Constant.IMG_PREF
    var jobs = [];
    jobs.push(rocket.get(Constant.WEB_ROOT + '/front/banner/list'));
    jobs.push(rocket.get(Constant.WEB_ROOT + '/front/product/list'));
    Promise.all([...jobs]).then(function([banResult, proResult]) {
        var banResult = JSON.parse(banResult),
            proResult = JSON.parse(proResult);
        // if (banResult.code != 200) {
        //     res.render('error', {
        //         message: banResult.msg,
        //         error: {
        //             status: banResult.code
        //         }
        //     });
        // } else {
        // }
        // console.warn(banResult.data, proResult.data)
        var bannerPics = banResult.data,
            productList = proResult.data;
        res.render('index', {
            title: '旦可韵',
            menu: 'index',
            bannerPics: bannerPics,
            productList: productList,
            root: Constant.WEB_ROOT
        });
    })

});

module.exports = router;
