/**
 * Controller
 */
const fs = require('fs');
const path = require('path');

const model = require('../data.json');

// 生成当前图书自增编号
let maxBookCode = () => {
    let arr = [];
    model.forEach(value => {
        arr.push(value.id);
    });
    return Math.max.apply(null, arr);
};

const apis = {
    // 展示主页
    showIndex(req, res) {
        res.render('index', {
            bookList: model
        });
    },
    // 跳转到“添加图书”页面
    showAddBook(req, res) {
        res.render('addbook', {});
    },
    // 添加图书方法
    addBook(req, res) {
        let info = req.body;
        let book = {};
        book.id = maxBookCode() + 1;
        for (let key in info) {
            book[key] = info[key];
        }
        model.push(book);

        fs.writeFile(path.join(__dirname, '../data.json'), JSON.stringify(model, null, 4), err => {
            if (err) {
                res.send('Server Error');
            }
            res.redirect('/');
        });
    }
};

module.exports = apis;
