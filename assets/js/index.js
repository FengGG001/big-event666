// ------------------------- 获取用户信息，并且渲染页面------------------------------------------------
function getUserInfo() {
    $.ajax({
        url: 'http://www.liulongbin.top:3007/my/userinfo',
        success: function (res) {
            console.log(res)
            // 渲染页面  1、设置欢迎语
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
        },
        headers: {
            Authorization: localStorage.getItem('token'),
        }
    })
};
getUserInfo();
