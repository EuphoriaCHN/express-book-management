((window, undefined) => {
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
})(window, undefined);
