var express = require('express');
var Constant = require('../utils/const');
var rocket = require('../utils/rocket');
var router = express.Router();

router.get(['/', '/:id'], function(req, res) {
    var showId = req.params.id;
    if (showId === undefined) {
        var jobs = [];
        jobs.push(rocket.get(Constant.WEB_ROOT + '/front/banner/showBannerList'));

        Promise.all([...jobs]).then(function([banResult]) {
            var banResult = JSON.parse(banResult);

            var bannerPics = banResult.data;

            res.render('show', {
                title: '旦可韵 - show',
                menu: 'show',
                bannerPics: bannerPics,
                root: Constant.WEB_ROOT
            });
        }).catch(function(error) {
            res.render('error', {
                message: '抱歉，系统开小差了，请刷新重试.'
            });
        });
    } else {

    }

});

module.exports = router;
