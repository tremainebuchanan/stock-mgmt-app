const express = require('express');

const router = express.Router();
const { redirectLogin } = require('../middlewares/middlewares');
const { extractUser } = require('../middlewares/middlewares');
const sessionService = require('../services/session');
const productService = require('../services/product');

router.get('/dashboard', redirectLogin, extractUser, async (req, res) => {
  const sessions = await sessionService.index();
  const products = await productService.index();
  const initialValue = 0;
  const totalInventory = products.reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity,
    initialValue,
  );
  const viewData = {
    title: 'Dashboard',
    user: res.locals.user,
    sessions,
    products,
    totalInventory,
  };
  res.render('dashboard/index', { viewData });
});

module.exports = router;
