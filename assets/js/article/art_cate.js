$(function() {
    var layer = layui.layer
    var form = layui.form

    initArtCateList()

    // 获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(e) {
                var tableHtml = template('tpl-table', e)
                $('tbody').html(tableHtml)
            }
        })
    }

    //为添加类别按钮绑定点击事件
    var indexLayer = null
    $("#btnAddCate").on("click", function() {
        indexLayer = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $("#dialog-add").html()
        });
    })

    // 通过代理的形式，添加分类
    $("body").on('submit', '#form-add', function(res) {
        res.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(e) {
                if (e.status !== 0) {
                    return layer.msg('添加分类失败！')
                }
                layer.msg('添加分类成功！')
                initArtCateList();
                //根据索引，关闭对应的弹出层
                layer.close(indexLayer)
            }
        })
    })

    // 通过代理的形式，为 btn-edit 添加绑定事件
    var indexEdit = null
    $("tbody").on('click', '.btn-edit', function(e) {
        //弹出一个修改信息层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $("#dialog-edit").html()
        });
        var id = $(this).attr("data-id")
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                form.val('form-edit', res.data)
            }
        })
    })

    // 通过代理的形式，修改分类
    $("body").on('submit', '#form-edit', function(res) {
        res.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(e) {
                if (e.status !== 0) {
                    return layer.msg('修改分类信息失败！')
                }
                layer.msg('修改分类信息成功！')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })

    // 通过代理的形式，删除分类
    $("tbody").on('click', '.btn-delete', function() {
        var id = $(this).attr("data-id")
            //提示用户是否要删除
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: "GET",
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initArtCateList()
                }
            })
        });
    })
})