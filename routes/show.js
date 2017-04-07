var express = require('express');
var Constant = require('../utils/const');
var rocket = require('../utils/rocket');
var router = express.Router();

router.get(['/', '/:id', '/:id/:footer'], function(req, res) {
    var showId = req.params.id,
        footer = req.params.footer;
    if (showId === undefined) {
        var jobs = [];
        jobs.push(rocket.get(Constant.WEB_ROOT + '/front/banner/showBannerList'));
        jobs.push(rocket.get(Constant.WEB_ROOT + '/front/show/showImageList'));

        Promise.all([...jobs]).then(function([banResult, showResult]) {
            var banResult = JSON.parse(banResult),
                showResult = JSON.parse(showResult);

            var bannerPics = banResult.data,
                showData = showResult.data,
                middleShowList = showData.middleShowList,
                oldShowList = showData.oldShowList;

            res.render('show', {
                title: '旦可韵 - show',
                menu: 'show',
                bannerPics: bannerPics,
                seasonName: middleShowList.length > 0 ? middleShowList[0].showSeason : '',
                middleShowList: middleShowList,
                oldShowList: oldShowList,
                root: Constant.WEB_ROOT
            });
        }).catch(function(error) {
            res.render('error', {
                message: '抱歉，系统开小差了，请刷新重试.'
            });
        });
    } else {
        var jobs = [];
        if (footer === undefined) {
            jobs.push(rocket.get(Constant.WEB_ROOT + '/front/banner/showBannerList'));
            jobs.push(rocket.get(Constant.WEB_ROOT + '/front/show/showImageList?seasonId=' + showId));
        } else {
            jobs.push(rocket.get(Constant.WEB_ROOT + '/front/banner/showBannerList?menuStatus=true'));
            jobs.push(rocket.get(Constant.WEB_ROOT + '/front/show/showImageList?seasonId=' + showId + '&menuStatus=true'));
        }

        Promise.all([...jobs]).then(function([banResult, showResult]) {
            var banResult = JSON.parse(banResult),
                showResult = JSON.parse(showResult);

            var bannerPics = banResult.data,
                showData = showResult.data,
                middleShowList = showData.middleShowList,
                oldShowList = showData.oldShowList;

            res.render('show', {
                title: '旦可韵 - show',
                menu: 'show',
                bannerPics: bannerPics,
                seasonName: middleShowList.length > 0 ? middleShowList[0].showSeason : '',
                middleShowList: middleShowList,
                oldShowList: oldShowList,
                root: Constant.WEB_ROOT
            });
        }).catch(function(error) {
            res.render('error', {
                message: '抱歉，系统开小差了，请刷新重试.'
            });
        });
    }

});

module.exports = router;
