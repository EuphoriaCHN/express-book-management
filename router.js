/**
 * 路由模块
 */

const express = require('express');
const router = express.Router();

const service = require('./controller/controller');

router.get('/', service.showIndex);

module.exports = router;
