var express = require('express');
var router = express.Router()
const sessionService = require('../services/session')
// const redirectLogin = require('../middlewares/middlewares').redirectLogin
// const extractUser = require('../middlewares/middlewares').extractUser

router.get('/sessions', async (req, res, next) => {
    const sessions = await sessionService.index()
    res.json(sessions)
});

module.exports = router;
