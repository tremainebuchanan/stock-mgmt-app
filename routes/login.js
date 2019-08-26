var express = require('express');
var router = express.Router();
const User = require('../models/db').User
const sessionChecker = require('../middlewares/middlewares').sessionChecker
const redirectHome = require('../middlewares/middlewares').redirectHome

router.get('/login', redirectHome, function (req, res, next) {
    res.render('login/index', { title: 'Login' });
});

router.post('/authenticate', (req, res, next)=>{
    console.log(req.body)
    // User.find({'email': req.body.email}).exec((err, user)=>{
    //     console.log(user)
    // })
    res.redirect('/login')
})

module.exports = router;
