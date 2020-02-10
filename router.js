const express = require('express');

const apis = require('./controller/controller');
const router = express.Router();

// 提供所有的图书信息
router.get('/books',apis.allBooks);
// 添加图书信息时提交数据
router.post('/books/book',apis.addBook);
// 编辑图书时根据id查询相应信息
router.get('/books/book/:id',apis.getBookById);
// 提交编辑的数据
router.put('/books/book',apis.editBook);
// 删除图书信息
router.delete('/books/book/:id',apis.deleteBook);

module.exports = router;
