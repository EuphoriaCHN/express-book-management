((window, undefined) => {
    function initList() {
        $(function () {
            // 渲染列表数据
            new Promise(resolve => {
                $.ajax({
                    type: 'get',
                    url: '/books',
                    dataType: 'json',
                    success(res) {
                        resolve(res);
                    }
                });
            }).then(value => {
                let html = template('indexTpl', {
                    list: value
                });
                let dataList = $('#dataList');
                dataList.html(html);

                // 必须在渲染结束后才可以操作 DOM 标签
                dataList.find('tr').each((index, element) => {
                    let td = $(element).find('td:last-child');
                    let bookId = $(element).find('td:first-child').text();
                    td.find('a:eq(0)').on('click', function () {
                        new Promise(resolve => {
                            // 编辑
                            $.ajax({
                                type: 'get',
                                url: '/books/book/' + bookId,
                                dataType: 'json',
                                success(res) {
                                    resolve(res);
                                }
                            });
                        }).then(value => {
                            let editBookHTML = template('indexTpl', {
                                editData: value,
                            });

                            let dialog = new MarkBox(600, 400, '编辑图书', $(editBookHTML).get(0));
                            dialog.init();

                            $('#editBookSubmit').on('click', function () {
                                $.ajax({
                                    type: 'put',
                                    url: '/books/book',
                                    data: $('#editBook').serialize(),
                                    dataType: 'json',
                                    success(res) {
                                        console.log(res);
                                        if (res.flag === 1) {
                                            dialog.close();
                                            initList();
                                        } else {
                                            console.error('Server Error');
                                        }
                                    }
                                });
                            });
                        });
                    });
                    td.find('a:eq(1)').on('click', function () {
                        // 删除
                        $.ajax({
                            type: 'delete',
                            dataType: 'json',
                            url: '/books/book/' + bookId,
                            success(res) {
                                initList();
                            }
                        });
                    });
                });
            });
        });
    }

    initList();

    // 添加图书信息
    $('#addBook').on('click', function () {
        const form = $('#addBookForm');
        const dialog = new MarkBox(600, 400, '添加图书', form.get(0));
        dialog.init();

        $('#addBookSubmit').on('click', function () {
            $.ajax({
                type: 'post',
                url: '/books/book',
                data: form.serialize(),
                dataType: 'json',
                success(res) {
                    if (res.flag === '1') {
                        dialog.close();
                        initList();
                    } else {
                        console.error('Server Error');
                    }
                }
            });
        });
    });
})(window, undefined);
