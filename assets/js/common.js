$.ajaxPrefilter(function (options) {
    // 修改url
    // options.url = 'http://www.liulongbin.top:3007' + options.url;
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    // 统一配置 tomplete
    options.complete = function (xhr) {
        if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
            // 删除 token 
            localStorage.removeItem('token');
            // 跳转页面到 login.html
            location.href = '/login.html'
        }
        // console.log(xhr)
    }
    // 统一配置headers
    options.headers = {
        Authorization: localStorage.getItem('token'),
    }
})