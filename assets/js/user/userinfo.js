// ---------------------- 为表单赋值（数据回填） --------------------
// 页面刷新发送 ajax 请求  获取用户信息，渲染页面
var form = layui.form;
function renderUser() {
    $.ajax({
        url: '/my/userinfo',
        success: function(res) {
            if(res.status === 0) {
                form.val('user',res.data)
            }
        }
    })
}
renderUser();

// ---------------------- 完成用户信息更新 --------------------
$('form').on('submit',function(e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: '/my/userinfo',
        data: data,
        success: function(res) {
            layer.msg(res.message);
            if(res.status === 0) {
                // 修改成功之后，调用之前封装的渲染页面的函数
                // window 表示当前窗口，parent 表示父级。。组合到一起表示调用父页面的函数
                window.parent.getUserInfo();
            }
        }
    })
})


// ---------------------- 重置表单 --------------------
$('#btn').click(function(e) {
    e.preventDefault();
    // 调用函数为表单赋值，重新渲染页面
    renderUser();
})