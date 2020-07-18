// 加载分页模块
var laypage = layui.laypage;
var form = layui.form;
// 设置全局变量
var data = {
    pagenum: 1, // 页码值，有多少页
    pagesize: 2 // 每页有多少条数据
}
// --------------------------- ajax 请求获取文章列表，渲染到页面-------------------------
function renderArticle() {
    // ajax 请求获取数据
    $.ajax({
        url: '/my/article/list',
        data: data,
        success: function (res) {
            console.log(res)
            var html = template('tpl-article', res);
            $('tbody').html(html)
            renderPage(res.total);
        }
    })
};
renderArticle();

// ----------------------------------------- 分页 ---------------------------------------------
// 封装函数
function renderPage(t) {
    laypage.render({
        elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
        count: t,//数据总数，从服务端得到
        limit: data.pagesize, // 每页显示多少条
        curr: data.pagenum, // 显示当前页
        // groups: 5, // 连续显示的页码值
        limits: [2, 3, 5, 7],
        layout: ['limit', 'prev', 'page', 'next', 'skip','count'],
        // jump  切换页面时的回调函数   刷新页码的时候触发这个函数
        jump: function(obj,first) {
            // 刷新页面时，first = true  切换页面的时候 first = undefined
            // obj 就是当前点击哪页，curr 就显示哪页的页码值
            // 当切换页码的时候，调用函数渲染页面
            if(first === undefined) {
                // 由于 obj.curr 对应的是当前页码的值  所以需要修改 ajax 函数
                data.pagenum = obj.curr;
                data.pagesize = obj.limit;
                // 渲染页面  调用封装好的渲染页面的函数
                renderArticle();
            }
        }
    });
}
// ----------------------------------------- ajxj请求获取所有分类 ---------------------------------------------
$.ajax({
    url: '/my/article/cates',
    success: function(res) {
        var html = template('tpl-category',res)
        $('#category').html(html)
        form.render('select')
    } 
})

// ---------------------------------- 筛选 -------------------------------
// 搜索区的表单提交了，阻止表单默认行为 
$('form').on('submit',function(e) {
    e.preventDefault();
    // 获取两个下拉框的内容
    var cate = $('#category').val();
    var state = $('#state').val();
    // 改变 ajax 的请求
    // data.cate = (cate == 0)? null: cate;
    // data.state = (state == 0)? null: state;
    data.cate = cate;
    data.state = state;
    // 把页码重置为 1
    data.pagenum = 1;
    // 渲染页面
    renderArticle();
})

// ------------------------------------- 删除按钮 --------------------------------
$('tbody').on('click','.btn',function() {
    
})