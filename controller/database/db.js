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
        host: 'your_host',
        user: 'your_db_account',
        password: 'your_db_password',
        database: 'your_db_name'
    });

    connection.connect();

    connection.query(sql, data, (err, result, fields) => {
        if (err) throw err;
        callback(result, fields);
    });

    connection.end();
};
