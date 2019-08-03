var express = require('express');
var router = express.Router();
const Inventory = require('../models/db').Inventory
const Product = require('../models/db').Product

router.get('/inventory', function (req, res, next) {
    // let query = req.query
    // let view = 'list'
    // if (query.view === 'grid') view = 'grid'
    Inventory.find().limit(25).exec(function (err, stock) {
        res.render('inventory/index', { title: 'Inventory', stock: stock, user: res.locals.user})
    })
});

router.post('/inventory', function (req, res, next) {
    res.redirect('inventory/add?success=true');
});

router.get('/inventory/add', function (req, res, next) {
    Product.find().exec((err, products)=>{
        res.render('inventory/create', 
        {   title: 'Inventory | Add Stock', 
            products: products,
            user: res.locals.user    
        })
    })    
    //res.render('inventory/create', { title: 'Inventory | Add Stock'});
});

module.exports = router;
