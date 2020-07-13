// ------------------------- 获取用户信息，并且渲染页面------------------------------------------------
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            if (res.status === 0) {
                // console.log(res)
                // 渲染页面  1、设置欢迎语  如果用户有名称使用用户名，，没有那么使用用户的账号名称
                var name = res.data.nickname || res.data.username;
                $('#username').html('&nbsp;&nbsp;' + name)
                // 2.设置头像
                if (res.data.user_pic) {
                    // 有图片  使用头像
                    $('.layui-nav-img').attr('src', res.data.user_pic).show();
                    $('.txt-avater').hide();
                } else {
                    // 没有图片，使用账号
                    var firstWord = name.substr(0, 1).toUpperCase();
                    $('.txt-avater').text(firstWord).css('display', 'inline-block');
                    $('.layui-nav-img').hide();
                }
            }
        },
    })
};
getUserInfo();

// --------------------------------------- 退出---------------------------------------
// 思路  删除本地存储的字符串，跳转 login 页面
$('#logout').click(function () {
    layer.confirm('确定退出吗', function (index) {
        // 删除 token 
        localStorage.removeItem('token');
        // 跳转页面到 login.html
        location.href = '/login.html';
    })
})
