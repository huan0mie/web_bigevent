// http://api-breakingnews-web.itheima.net
$.ajaxPrefilter(function(options) {
    // 发起真正的Ajax之前， 统一拼接跟路径
    options.url = "http://api-breakingnews-web.itheima.net" + options.url;
    // console.log(options.url);
})