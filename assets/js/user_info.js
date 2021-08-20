$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    });
    //初始化用户信息
    initUserInfo();

    //重置表单
    $("#btnReset").on("click", function(e) {
        //阻止表单默认提交行为
        e.preventDefault()
        initUserInfo()
    })

    //提交表单
    $('.layui-form').on("submit", function(e) {
        e.preventDefault();
        //发起Ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败！')
                }
                layer.msg("修改信息成功");
                //调用父类的构造方法
                window.parent.getUserInfo()
            }
        })
    })

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                form.val('formUserInfo', res.data)
            }
        })
    };

})