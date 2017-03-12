var express = require('express');
var Constant = require('../utils/const');
var rocket = require('../utils/rocket');
var router = express.Router();

/* GET common listing. */
router.get('/:type', function(req, res) {
    var type = req.params.type, typeName;

    switch(type) {
        case '1':
            typeName = '关于我们';
            break;
        case '4':
            typeName = '服务';
            break;
        case '5':
            typeName = '联络';
            break;
        default:
            return res.render('error', {
                message: '不存在该菜单.'
            });
    }

    var jobs = [];
    jobs.push(rocket.get(Constant.WEB_ROOT + '/front/fmenu/list?type=' + type));

    Promise.all([...jobs]).then(function([menuResult]) {
        var menuResult = JSON.parse(menuResult);
        if (menuResult.success) {
            var menuList = menuResult.data;

            if (menuList && menuList.length > 0) {
                res.render('article', {
                    title: '旦可韵 - ' + typeName,
                    typeName: typeName,
                    menu: 'article',
                    menuList: menuList,
                    menuListStr: JSON.stringify(menuList),
                    root: Constant.WEB_ROOT
                });
            } else {
                res.render('error', {
                    message: '抱歉，' + typeName + '中暂时还未录入文章.'
                });
            }
        } else {
            res.render('error', {
                message: '抱歉，文章信息获取失败.'
            });
        }


    }).catch(function(error) {
        res.render('error', {
            message: '抱歉，系统开小差了，请刷新重试.'
        });
    });
});

module.exports = router;
