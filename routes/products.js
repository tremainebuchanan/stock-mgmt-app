/* eslint-disable consistent-return */
const express = require('express');

const router = express.Router();
const { extractUser } = require('../middlewares/middlewares');
const { redirectLogin } = require('../middlewares/middlewares');
const productService = require('../services/product');
const { isValid } = require('../services/validation');

router.get('/products', redirectLogin, extractUser, async (req, res) => {
  const { query } = req;
  let view = 'list';
  if (query.view === 'grid') view = 'grid';
  const products = await productService.index();
  const viewData = {
    title: 'Products',
    products,
    view,
    markup: productService.getMarkup(),
    resource: 'product',
    user: res.locals.user,
  };
  res.render('products', { viewData });
});


router.post('/products', async (req, res) => {
  let success = true;
  const outcome = isValid(req.body);
  if (outcome.success === false) {
    return res.redirect('/products/new?success=false');
  }
  const result = await productService.create(req.body);
  if (!result) success = false;
  res.redirect(`products/new?success=${success}`);
});

router.get('/products/new', redirectLogin, extractUser, (req, res) => {
  let outcome = {
    success: false,
    message: '',
  };
  if (req.query.success === 'true') {
    outcome.success = true;
    outcome.message = 'Product created successfully';
  }
  const viewData = { title: 'Products | New', outcome, user: res.locals.user };
  res.render('products/create', { viewData });
});

router.delete('/products/:id', (req, res) => {
  const result = productService.remove(req.params.id);
  if (!result) {
    return res.json({
      success: false,
      message: 'There was an error while attempting to delete product',
    });
  }
  return res.json({
    success: true,
    message: 'Product successfully deleted',
  });
});

module.exports = router;
