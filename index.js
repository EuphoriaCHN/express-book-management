/**
 * 图书管理系统 - 入口文件
 */
const path = require('path');

const express = require('express');
const template = require('art-template');
const bodyParser = require('body-parser');

const router = require('./router.js');

const app = express();

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');

// 使 Express 兼容 Art-template 引擎
app.engine('art', require('express-art-template'));

// 挂载中间件
app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(bodyParser.json());

// 托管静态文件与虚拟路径
app.use('/www', express.static('public'));

// 设置路由与监听端口
app.use(router).listen(3000, () => console.log('Running...'));
