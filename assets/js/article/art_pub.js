$(function() {
    var layer = layui.layer
    var form = layui.form

    initCate();
    // 初始化富文本编辑器
    initEditor();

    //获取文章分类
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(e) {
                if (e.status !== 0) {
                    return layer.msg('获取文章分类失败！')
                }
                var htmlStr = template('tpl-cate', e)
                $("[name=cate_id]").html(htmlStr);
                // 一定要记得调用 form.render() 方法
                form.render()
            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $("#btnChooseImage").on('click', function() {
        $("#coverFile").click()
    })

    //监听文件是否有更换照片
    $("#coverFile").on('change', function(e) {
        var file = e.target.files;
        //判断是否选择了照片
        if (file.length === 0) {
            return
        }
        //获取照片地址
        var newImgURL = URL.createObjectURL(file[0])
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    //设置status
    var art_state = '已发布';
    $("#btnSave2").on('click', function() {
        art_state = '草稿'
    })

    //表单提交
    $("#form-sub").on('submit', function(e) {
        //阻止表单默认提交行为
        e.preventDefault();
        //把获取的表单数据转换为DOM
        var fd = new FormData($(this)[0])
        fd.append('state', art_state);
        //将裁剪到的照片，输出为一个文件对象
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob);
                console.log(fd);
                //发起Ajax请求
                publishArticle(fd)
            })
    })

    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            //如果是用FormData获取数据的话，那就一定要有下面2个基本数据
            contentType: false,
            processData: false,
            success: function(e) {
                console.log(e);
                if (e.status !== 0) {
                    return layer.msg('发表文章失败！')
                }
                layer.msg('发表文章成功！')
                location.href = '/article/art_list.html'
            }
        })
    }

})