((window, undefined) => {
    function initList() {
        $(function () {
            // 渲染列表数据
            $.ajax({
                type: 'get',
                url: '/books',
                dataType: 'json',
                success(res) {
                    let html = template('indexTpl', {
                        list: res
                    });
                    $('#dataList').html(html);
                }
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
