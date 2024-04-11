// 202132118_박혜정

const express = require('express');
var router = express.Router()

router.use(express.static('public'));

var purchase = require('../lib/purchase');

router.get('/', (req, res) => {
    purchase.purchase(req, res);
});

router.get('/detail/:merId', (req, res) => {
    purchase.detail(req, res);
});

router.post('/purchase_process', (req, res) => {
    purchase.purchase_process(req, res);
})

router.get('/update_process/:purchaseId', (req, res) => {
    purchase.purchase_update_process(req, res);
})

router.get('/delete_process/:purchaseId', (req, res) => {
    purchase.purchase_delete_process(req, res);
})

router.get('/cancel_process/:purchaseId', (req, res) => {
    purchase.cancel_process(req, res);
})

router.get('/cart', (req, res) => {
    purchase.cart(req, res);
})

router.post('/cart_process/:merId', (req, res) => {
    purchase.cart_process(req, res);
})

router.post('/cart/purchase_process', (req, res) => {
    purchase.cart_purchase_process(req, res);
})

router.get('/cart/delete_process/:cartId', (req, res) => {
    purchase.cart_delete_process(req, res);
})

router.get('/cart/update_process/:cartId', (req, res) => {
    purchase.cart_update_process(req, res);
})

router.get('/cart/cart_manager', (req, res) => {
    purchase.cart_manager(req, res);
})

module.exports = router;