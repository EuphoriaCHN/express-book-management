/**
 * Controller
 */
const fs = require('fs');
const path = require('path');

const model = require('../data.json');
const db = require('./database/db').db;

// 生成当前图书自增编号
let maxBookCode = () => {
    let arr = [];
    model.forEach(value => {
        arr.push(value.id);
    });
    return Math.max.apply(null, arr);
};

// 将当前模型写入文件
let writeDataToFile = res => {
    fs.writeFile(path.join(__dirname, '../data.json'), JSON.stringify(model, null, 4), err => {
        if (err) {
            res.send('Server Error');
        }
        res.redirect('/');
    });
};

const apis = {
    // 展示主页
    showIndex(req, res) {
        db('select * from books', result => {
            res.render('index', {bookList: result});
        });
    },
    // 跳转到“添加图书”页面
    showAddBook(req, res) {
        res.render('addbook', {});
    },
    // 添加图书方法
    addBook(req, res) {
        let book = req.body;
        db('insert into books set ?', book, result => {
            if (result.affectedRows === 1) {
                // 影响了一行
                res.redirect('/');
            }
        });
    },
    // 跳转至修改图书信息页面
    toModifyBook(req, res) {
        let id = req.query.id;
        db('select * from books where id = ?', [id], result => {
            res.render('editbook', result[0]);
        });
    },
    // 修改图书信息
    modifyBook(req, res) {
        let info = Object.values(req.body);
        info.push(info.shift());
        db('update books set name = ?, author = ?, category = ?, description = ? where id = ?',
            info,
            () => {
                res.redirect('/');
            }
        );
    },
    // 删除图书信息
    deleteBook(req, res) {
        let id = req.query.id;
        db('delete from books where id = ?', [id], () => {
            res.redirect('/');
        });
    }
};

const apisWithoutDB = {
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
        writeDataToFile(res);
    },
    // 跳转至修改图书信息页面
    toModifyBook(req, res) {
        let id = req.query.id;
        let book = null;
        model.forEach(value => {
            if (value.id === id) {
                book = value;
                return;
            }
        });
        res.render('editbook', book);
    },
    // 修改图书信息
    modifyBook(req, res) {
        let info = req.body;

        model.forEach((value, index) => {
            if (value.id === info.id) {
                model[index] = info;
                return;
            }
        });
        writeDataToFile(res);
    },
    // 删除图书信息
    deleteBook(req, res) {
        let id = req.query.id;
        model.forEach((value, index) => {
            if (value.id + '' === id + '') {
                model.splice(index, 1);
                return;
            }
        });
        writeDataToFile(res);
    }
};

module.exports = apis;
