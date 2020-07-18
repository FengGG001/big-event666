var form = layui.form;

// ----------------------- ajax获取分类，渲染到下拉框的位置 ---------
$.ajax({
    url: '/my/article/cates',
    success: function (res) {
        var html = template('tpl-category', res);
        $('.select').html(html);
        // 更新渲染
        form.render('select');
    }
});

// ----------------------- 使用富文本编辑器 ----------------------
initEditor(); // 这个函数在 tinymce_setup.js 里面

// ------------------------- 实现初始的剪裁效果 ---------------------------------
// 获取需要剪裁的图片
var image = $('#image');
// 2. 裁剪选项
var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
}
// 调用插件中封装的方法
// 3. 初始化裁剪区域
image.cropper(options)

// -------------------------------- 点击图片，实现能够更换图片 -------------------------
// 当点击按钮的时候，自动触发隐藏域的点击事件
// 加一个隐藏的 文件域
// 点击按钮，触发文件域的单击事件
$('button:contains("选择封面")').click(function () {
    $('#file').click();
});

// ----------------------- 图片改变了，更换剪裁区的图片---------------
$('#file').change(function () {
    // 1) 生成url
    var fileObj = this.files[0];
    var url = URL.createObjectURL(fileObj);

    // 2) 更换剪裁区的图片
    image.cropper('destroy').attr('src', url).cropper(options);
});


// ------------------------ 处理按钮 -----------------------------
var s = '';
$('button:contains("发布")').click(function () {
    s = '已发布'
});

$('button:contains("存为草稿")').click(function () {
    s = '草稿'
});



// ------------------------- 表单提交，完成添加 -----------------------------
$('form').on('submit', function (e) {
    e.preventDefault();
    // 收集表单各项的值
    var data = new FormData(this); // 必须传入DOM对象
    // data里面缺少state，所以追加一个
    data.append('state', s);
    // 不关心原来是否能够获取到内容，直接使用富文本编辑器内置方法获取值
    data.set('content', tinyMCE.activeEditor.getContent());
    // 剪裁图片
    var canvas = image.cropper('getCroppedCanvas', {
        width: 400,
        height: 280
    });
    // canvas.toDataURL() // 把canvas图片转成base64格式的字符串
    canvas.toBlob(function (blob) {
        // 形参 blob 就是转换后的结果
        data.append('cover_img', blob);
        // 遍历data，检查data里面有哪些数据
        data.forEach(function (value, key) {
            console.log(key, value);
        });
        // ajax提交给接口，从而完成添加
        $.ajax({
            type: 'POST',
            url: '/my/article/add',
            data: data,
            success: function (res) {
                console.log(res)
                layer.msg(res.message);
                if (res.status === 0) {
                    // 如果添加成功，跳转到文章列表页面
                    location.href = '/article/article.html';
                }
            },
            // 提交FormData数据，必须加下面两项
            processData: false,
            contentType: false
        });
    });
})