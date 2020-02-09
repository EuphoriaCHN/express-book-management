/**
 * 路由模块
 */

const express = require('express');
const router = express.Router();

const apis = require('./controller/controller');

router.get('/', apis.showIndex);
router.get('/toaddbook', apis.showAddBook);
router.post('/addbook', apis.addBook);

module.exports = router;
