// http://api-breakingnews-web.itheima.net
$.ajaxPrefilter(function(options) {
    // 发起真正的Ajax之前， 统一拼接跟路径
    options.url = "http://api-breakingnews-web.itheima.net" + options.url;
    // console.log(options.url);

    // 统一为有权限的接口，设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //全局统一挂载complete函数
    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            //1.清除token
            localStorage.removeItem('token');
            //2.返回登录页面
            location.href = '/login.html'
        }
    }
})