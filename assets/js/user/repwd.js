// ---------------------------------------重置密码的表单验证------------------------------

  var form = layui.form;
  //自定义验证规则
  form.verify({
      // 数组或函数方法
      // 验证长度

      // 1.三个密码框验证长度
      len: [/^\S{6,12}$/,'密码长度必须为6~12位，且不能出现空格'],


      // 2.新密码不能和原密码相同
      diff: function(val) {
        // val 表示新密码
        // 获取原密码
        var oldPwd = $('.oldPwd').val();
        // 判断两个密码是否相同
        if(val === oldPwd) {
            return '新密码不能和原密码相同'
        }
      },

      // 3.两次新密码必须一致
      same: function(val) {
          // val 表示输入的新密码
          // 获取新密码的 val 值
          var newPwd = $('.newPwd').val();
          // 判断两次输入的密码是否一致
          if(val != newPwd) {
              return '两次输入密码不一致'
          }
      }
  })

// --------------------------------------- 按照接口要求，实现密码重置 ------------------------------
// 监听表单提交事件
$('form').on('submit',function(e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.post('/my/updatepwd',data,function(res) {
        // 无论成功失败，都要给提示
        layer.msg(res.message);
        // 判断是否修改成功
        if(res.status === 0) {
            // 修改成功，清空输入框的是
            $('form')[0].reset();
        }
    })
})




