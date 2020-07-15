// ---------------------------------- 初始化剪裁插件 -------------------------------------
// 1) 找到剪裁区的图片
var image = $('#image');
// 2) 设置剪裁插件的配置项
var options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
};
// 3) 调用剪裁插件，实现最初始化的剪裁
image.cropper(options);

// ------------------------------ 选择图片 ----------------------------------------
// 只有文件域可以选择图片，所以在页面中添加一个隐藏的文件域，注册点击事件  实现选择图片
// 上传按钮注册点击事件
$('.btn').click(function () {
    // 点击按钮之后，触发文件域的点击事件
    $('#file').click();
})

// ------------------------------ 文件域发生改变的时候，更换头像 ----------------------------------------
// 注册文件域的 change 事件
$('#file').change(function () {
    console.log(111)
    // 需要得到选择图片的 url 
    // 1) 获取文件对象
    var fileObj = this.files[0]
    // 为文件对象创建一个临时的 url 利用 JS 中的内置方法
    var url = URL.createObjectURL(fileObj);
    // 要想更换剪裁区的图片，就先销毁剪裁区
    image.cropper('destroy')
    // 找到剪裁区的图片，更换当前图片的 src 路径
    image.attr('src', url)
    // 最后调用剪裁图片的方法，渲染页面
    image.cropper(options);
})


// --------------------------点击确定按钮，实现剪裁效果，转成 base64 格式，ajax提交
$('.btn1').click(function () {
    // 调用插件提供的方法，实现剪裁效果，使用ajax 提交
    var dataURL = image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
    })
    // .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    // 把 Canvas 图片转成 base64 格式
    var img_base64 = dataURL.toDataURL('image/jpg')
    console.log(img_base64)
    // ajax 请求接口，完成更换
    $.ajax({
        type: 'POST',
        url: '/my/update/avatar',
        data: {
            avatar: img_base64
        },
        success: function (res) {
            console.log(res)
            layer.msg(res.message)
            if (res.status === 0) {
                // 修改成功之后，调用之前封装的渲染页面的函数
                // window 表示当前窗口，parent 表示父级。。组合到一起表示调用父页面的函数
                window.parent.getUserInfo();
            }
        }
    })
})