/**
 * Controller
 */

const db = require('./database/db').db;

const apis = {
    // 获得所有的图书信息
    allBooks(req, res) {
        db('select * from books', data => {
            res.json(data);
        });
    },
    // 添加图书
    addBook(req, res) {
        let info = req.body;
        db('insert into books set ?', info, result => {
            if (result.affectedRows === 1) {
                res.json({
                    flag: 1
                });
            } else {
                res.json({
                    flag: 2
                });
            }
        });
    },
    // 根据 ID 获取图书信息
    getBookById(req, res) {
        let id = req.params.id;
        db('select * from books where id = ?', [id], data => {
            res.json(data[0]);
        });
    },
    // 编辑图书
    editBook(req, res) {
        let info = Object.values(req.body);
        info.push(info.shift());
        db('update books set name = ?, author = ?, category = ?, description = ? where id = ?',
            info,
            result => {
                if (result.affectedRows === 1) {
                    res.json({
                        flag: 1
                    });
                } else {
                    res.json({
                        flag: 2
                    });
                }
            }
        );
    },
    // 删除图书
    deleteBook(req, res) {
        let id = req.params.id;
        db('delete from books where id = ?', [id], result => {
            if (result.affectedRows === 1) {
                res.json({
                    flag: 1
                });
            } else {
                res.json({
                    flag: 2
                });
            }
        });
    }
};

module.exports = apis;
