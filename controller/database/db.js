/**
 * 数据库配置
 */

const mysql = require('mysql');

exports.db = function (sql, data, callback) {
    if (typeof data === 'function' && callback === undefined) {
        callback = data;
        data = undefined;
    }
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '610106',
        database: 'express_book_management_system'
    });

    connection.connect();

    connection.query(sql, data, (err, result, fields) => {
        if (err) throw err;
        callback(result, fields);
    });

    connection.end();
};
