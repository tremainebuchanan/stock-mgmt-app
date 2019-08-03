var express = require('express');
var router = express.Router();

router.get('/settings', function (req, res, next) {
    res.render('settings/index', { title: 'Settings' });
});

module.exports = router;
