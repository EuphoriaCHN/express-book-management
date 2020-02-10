/**
 * 测试用，拼接 sql 语句
 */

const path = require('path');
const fs = require('fs');

fs.readFile(path.join(__dirname, '../data.json'), (err, data) => {
    if (err) {
        console.error('error');
        return;
    }
    let list = JSON.parse(data);
    let arr = [];
    list.forEach(value => {
        let sql = `insert into books(name, author, category, description) values('${value.name}', '${value.author}', '${value.category}', '${value.desc}');`;
        arr.push(sql);
        console.log(sql);
    });
});
