// -------------------------获取分类，渲染到页面---------------------------------
// 封装函数，添加类别，编辑类别，删除类别  最后渲染页面
function renderCategory() {
    $.ajax({
        // 大事件接口
        url: '/my/article/cates',
        success: function (res) {
            // console.log(res)
            // 使用模板引擎渲染页面
            var html = template('tpl-list', res)
            // 通过模板引擎，放到 tbody 中
            $('tbody').html(html);
        },
    })

}
renderCategory();
// ----------------------------删除分类，渲染页面-------------------------------------
// 获取按钮设置点击事件
$('tbody').on('click', '.ipt', function () {
    // 获取自定义属性保存的 id 值
    var id = $(this).attr('data-id');
    // console.log(id)
    // 询问是否删除   layui 插件查找询问框
    layer.confirm('确定要删除吗？好好想想。', { icon: 3, title: '提示' }, function (index) {
        //do something
        // 确定删除  发送ajax请求，完成删除
        $.ajax({
            // 要删除的分类 Id，注意：这是一个URL参数  /my/article/deletecate/:id
            url: '/my/article/deletecate/' + id, // 把 :id 替换成实际 id 值  
            success: function (res) {
                // 无论成功失败，都要给提示  layui 插件
                layer.msg(res.message);
                // 如果成功的话呢 删除则重新渲染页面
                if (res.status === 0) {
                    // 渲染页面
                    renderCategory();
                }
            }
        })
        layer.close(index);
    });

})


// ----------------------------------------添加分类，渲染页面--------------------------------------
var addIndex;
// 点击添加按钮，，实现弹出层
$('.add').click(function () {
    addIndex = layer.open({
        type: 1,
        title: '添加文章分类',
        content: $('#tpl-add').html(),
        area: ['500px', '250px']
    });
});
// 注册表单提交事件，完成添加
$('body').on('submit', '.add-form', function (e) {
    // 阻止表单提交
    e.preventDefault();
    // 获取表单的数据
    var data = $(this).serialize();
    // ajax 请求提交数据，完成添加
    $.ajax({
        type: 'POST',
        url: '/my/article/addcates',
        // 当前需要添加的数据也是表单的数据
        data: data,
        success: function (res) {
            // 无论成功失败，都要给提示  layui 插件
            layer.msg(res.message);
            // 如果成功的话呢 删除则重新渲染页面
            if (res.status === 0) {
                // 渲染页面
                renderCategory();
                // 关闭弹层
                layer.close(addIndex);
            }
        }
    })
})


// ----------------------------------------编辑分类，渲染页面--------------------------------------
var editIndex;
// 点击编辑按钮，实现弹出层
$('body').on('click', '.edit', function () {
    // 获取事件源的三个自定义属性
    // var id = $(this).attr('data-id')
    // var name = $(this).attr('data-name')
    // var alias = $(this).attr('data-alias')
    // 获取事件源编辑按钮的三个自定义属性
    var get = $(this).data();
    // layui 插件  设置弹出层
    editIndex = layer.open({
        type: 1,
        title: '修改文章分类',
        content: $('#tpl-edit').html(),
        area: ['500px', '250px'],
        // success 表示弹层完成之后，调用的一个函数
        success: function () {
            // 在弹出层之后，修改当前 input 的 val 值
            $('input[name=name]').val(get.name);
            $('input[name=alias]').val(get.alias);
            $('input[name=id]').val(get.id);
        }
    });

})

//  注册表单的提交事件，最终实现表单编辑
$('body').on('submit', '.edit-form', function (e) {
    // 阻止表单提交
    e.preventDefault();
    // 获取表单数据
    var data = $(this).serializeArray();
    // 把表单数据的 id 值改为 Id
    data[2].name = 'Id';
    // 利用 ajax 提交数据  渲染页面
    $.ajax({
        type: 'POST',
        url: '/my/article/updatecate',
        data: data,
        success: function (res) {
            // 无论成功失败，都要给提示  layui 插件
            layer.msg(res.message);
            // 如果成功的话呢 删除则重新渲染页面
            if (res.status === 0) {
                // 渲染页面
                renderCategory();
                // 关闭弹层
                layer.close(editIndex);
            }
        }
    })
})

