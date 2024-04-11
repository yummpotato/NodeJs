// 202132118_박혜정

const express = require('express');
var router = express.Router();

router.use(express.static('public'));

var shop = require('../lib/shop');

router.get('/shop/:category', (req, res) => {
    shop.home(req, res); 
})

router.get('/search', (req, res) => {
    shop.search(req, res);
})

router.get('/shop/detail/:merId', (req, res) => {
    shop.detail(req, res);
})

router.get('/shop/anal/customer', (req, res) => {
    shop.customeranal(req, res);
})

router.get('/shop/anal/merchandise', (req, res) => {
    shop.merchandiseanal(req, res);
})

router.get('/shop/anal/board', (req, res) => {
    shop.boardanal(req, res);
})

module.exports = router;