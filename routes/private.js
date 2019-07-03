var express = require('express');
var router = express.Router();
var path = require('path');
var config = require('../config.js');
var utils = require('lockit-utils');

router.use(express.static(path.join(__dirname, 'static/vendor')));

router.get('/', utils.restrict(config), function(req, res) {
    res.render(path.join(__dirname, '../views', 'index'));
});


router.get('/vendor/:sub', function(req, res) {
    var sub = req.params.sub;
    res.sendFile(path.join(__dirname, '../static/vendor', sub));
});

router.get('/:sub', utils.restrict(config), function(req, res) {
    var sub = req.params.sub;
    res.render(path.join(__dirname, '../views', sub));
});
module.exports = router;
