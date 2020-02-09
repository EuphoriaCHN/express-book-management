/**
 * 图书管理系统 - 入口文件
 */
const path = require('path');

const express = require('express');
const template = require('art-template');
const bodyParser = require('body-parser');

const app = express();

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');

// 使 Express 兼容 Art-template 引擎
app.engine('art', require('express-art-template'));

