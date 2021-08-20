$(function() {
    // 获取用户的基本信息
    getUserInfo()

    // 退出功能
    var layer = layui.layer;
    $("#btnLogout").on("click", function() {
        layer.confirm("确定是否退出？", { icon: 3, title: '提示' }, function(index) {
            //1.清除token
            localStorage.removeItem('token');
            //2.回到登录页面
            location.href = '/login.html'

            layer.close(index);
        })
    });
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //headers 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 渲染用户头像
            renderAvatar(res.data);
        },
        //设置访问权限
        // complete: function(res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         //1.清除token
        //         localStorage.removeItem('token');
        //         //2.返回登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}

// 渲染用户头像
function renderAvatar(e) {
    var name = e.nickname || e.username
    $(".welcome").html('欢迎&nbsp;&nbsp;' + name)
    if (e.user_pic !== null) {
        $('.layui-nav-img').attr('src', e.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}