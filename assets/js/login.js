$(function() {
    // 点击“去注册账号”链接
    $("#link-reg").on("click", function() {
        $(".login-box").hide()
        $(".reg-box").show()
    });

    // 点击“去登录”链接
    $("#link-login").on("click", function() {
        $(".login-box").show()
        $(".reg-box").hide()
    });

    // layUI的正则表达
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //密码是否一致的验证
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次输入的密码不一致'
            }
        }
    });

    // 表单注册的事件监听
    $("#form_reg").on("submit", function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        $.post('/api/reguser', { username: $("#form_reg [name=username]").val(), password: $("#form_reg [name=password]").val() }, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录')
            $("#link-login").click();
        })
    });

    //表单登录的事件监听
    $("#form_id").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            //快速获取表单数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败');
                }
                layer.msg('登录成功');
                //登录成功之后获取token的字符串，这是登录后台的关键
                localStorage.setItem('token', res.token);
                // 跳转页面
                location.href = '/index.html'
            }
        })
    })
})