var express = require('express');
var router = express.Router();
const extractUser = require('../middlewares/middlewares').extractUser
const redirectLogin = require('../middlewares/middlewares').redirectLogin
const setMessage = require('../middlewares/middlewares').setMessage
const productService = require('../services/product')
const isValid = require('../services/validation').isValid

router.get('/products', redirectLogin, extractUser, async function(req, res, next) {
  let query = req.query
  let view = 'list' 
  if(query.view === 'grid') view = 'grid'
  const products = await productService.index()
  const viewData = {
      title: 'Products',
      products: products,
      view: view,
      markup: productService.getMarkup(),
      user: res.locals.user
    }
    res.render('products', {viewData: viewData})      
});


router.post('/products', async (req, res, next) => {
  const success = true
  const outcome = isValid(req.body)
  if(outcome.success === false){
    return res.redirect('/products/new?success=false')
  }
  const result = await productService.create(req.body)
  if(!result) success = false   
  res.redirect('products/new?success=' + success);
});

router.get('/products/new', redirectLogin, extractUser, (req, res, next) => {
  
  let obj = {
    success: false,
    message: ''
  }
  if(req.query.success === 'true'){
    obj.success = true,
    obj.message = 'Product created successfully'
  }
  const viewData = { title: 'Products | New', outcome: obj, user: res.locals.user}
  res.render('products/create', {viewData: viewData});
});

router.delete('/products/:id/delete', (req, res, next) => { 
  const result = productService.remove(req.params.id)
  if(result) res.redirect('/products?success=true')
})

module.exports = router;
