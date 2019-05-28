const express = require('express');
const router = express.Router();
const api = require('./api');
// 修改路径
router.get('/getUser', (req, res, next) => {
  api.getUser(req, res, next);
});

router.post('/addUser', (req, res, next) => {
  api.addUser(req, res, next);
});

router.get('/getAdmin', (req, res, next) => {
  api.getAdmin(req, res, next);
});

router.get('/getOrderList', (req, res, next) => {
  api.getOrderList(req, res, next);
});

router.post('/addOrderList', (req, res, next) => {
  api.addOrderList(req, res, next);
});

router.post('/addAdminLogin', (req, res, next) => {
  api.addAdminLogin(req, res, next);
});

router.get('/getAdminLogin', (req, res, next) => {
  api.getAdminLogin(req, res, next);
});

router.post('/addAdminRest', (req, res, next) => {
  api.addAdminRest(req, res, next);
});
router.get('/getAdminRest', (req, res, next) => {
  api.getAdminRest(req, res, next);
});

router.get('/getOrderListZero', (req, res, next) => {
  api.getOrderListZero(req, res, next);
});

router.get('/getOrderListOne', (req, res, next) => {
  api.getOrderListOne(req, res, next);
});
router.get('/getOrderListTwo', (req, res, next) => {
  api.getOrderListTwo(req, res, next);
});

router.post('/updateOrderList', (req, res, next) => {
  api.updateOrderList(req, res, next);
});

router.post('/addCoupon', (req, res, next) => {
  api.addCoupon(req, res, next);
});

router.get('/getCoupon', (req, res, next) => {
  api.getCoupon(req, res, next);
});

router.post('/updateMoney', (req, res, next) => {
  api.updateMoney(req, res, next);
});
router.get('/getUserMoney', (req, res, next) => {
  api.getUserMoney(req, res, next);
});

module.exports = router;