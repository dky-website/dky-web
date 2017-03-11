var express = require('express');
var Constant = require('../utils/const');
var rocket = require('../utils/rocket');
var router = express.Router();

/* GET common listing. */
router.get('/:type', function(req, res) {
    var type = req.params.type;
    res.send('respond with a resource.' + type);
});

module.exports = router;
