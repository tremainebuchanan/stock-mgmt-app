var express = require('express');
var router = express.Router();
const redirectLogin = require('../middlewares/middlewares').redirectLogin
const extractUser = require('../middlewares/middlewares').extractUser
const sessionService = require('../services/session')
const productService = require('../services/product')

router.get('/', redirectLogin, extractUser, async (req, res, next) => {
  const sessions = await sessionService.index()
  const products = await productService.index()
  const viewData = { 
    title: 'Dashboard', 
    user: res.locals.user, 
    sessions: sessions, 
    products: products
  }
  res.render('dashboard/index', {viewData: viewData});
});

module.exports = router;
