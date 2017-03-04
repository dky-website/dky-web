var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
    req.session.user = "session user...."
    res.render('index', {
        title: '旦可韵',
        type: 'index'
    });
});

module.exports = router;
