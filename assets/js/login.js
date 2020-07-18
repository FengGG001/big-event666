// 写 js 功能代码
// -----------------------------点击登录或注册切换页面------------------------------
$('#logins').click(function() {
    $('#register').show();
    $('#login').hide()
})
// 点击登录按钮，跳转到登录页面
$('#registers').click(function() {
    $('#login').show();
    $('#register').hide();
})

//  ----------------------------表单注册功能-------------------------------------
// 1. 注册表单提交事件
$('.register-form').on('submit',function(e) {
    // 阻止表单默认事件
    e.preventDefault();
    // 获取输入的账号密码  确认输入框有 name 属性  而且跟接口提交的一致
    var data = $(this).serialize();
    // console.log(data)
    // 使用 ajax 请求，将输入的提交到 接口
    $.ajax({
        type : 'POST',
        url : '/api/reguser',
        data : data,
        success : function(res) {
            // 根据接口提供的数据 是否正确都要提示一下
            layer.msg(res.message);
            // 如果现实登录成功了，则显示登录的盒子，隐藏当前注册盒子
            if(res.status === 0) {
                //隐藏当前盒子
                $('#login').show().next().hide();
            }
        }
    })
    // 最后把输入框的内容清空
    $('.layui-input').val('');
})
//-------------------------注册的表单验证功能----------------------------------------
// 使用 layui 提供的模块，必须提前引入模块
var form = layui.form;
// 调用 layui 方法验证表单
form.verify({
    // 调用这个方法必须以对象形式，并且是以键值对的方法实现的
    // 1. 验证表单的密码长度  必须在 6 位到 16 位之间
    // len : [/^\S{6,16}$/,'Sorry,您输入密码不正确'],
    len : function(val) {
        // 判断当前输入的是否符合要求
        if(!/^\S{6,16}$/.test(val)) {
            return'Sorry,密码输入不正确';
        }
    },
    // 判断第二次输入的密码是否跟上一次输入的一致
    same : function(val) {
        // 获取当前输入的密码
        var pwd = $('.pwd').val();
        // 判断当前两次输入的是否一致
        if(pwd != val) {
            // 如果当前输入的不等于前面输入 则 return
            return'抱歉，两次输入的密码不一致'
        }
    }
})
// -------------------------------表单的登录功能---------------------------------
// 注册表单提交事件
$('.login-form').on('submit',function(e) {
    // 阻止表单提交
    e.preventDefault();
    // 获取表单的数据
    var data = $(this).serialize();
    // 使用 ajax 请求提交事件
    $.ajax({
        type: 'POST',
        url: '/api/login',
        data: data,
        success: function(res) {
            // 不管登不登录上都要提示一下
            layer.msg(res.message);
            // 判断一下  数据是否符合要求
            if(res.status === 0) {
                // 把 token 保存到本地
                localStorage.setItem('token',res.token)
                // 登录成功之后，跳转的首页
                location.href = '/index.html';
            }
        }
    })
})