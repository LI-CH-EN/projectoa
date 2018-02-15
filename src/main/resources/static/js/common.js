//护眼模式
function  changeTheme() {
    //这里toggleClass的意思是如果 有就删掉 没有就加上
    //按钮切换
    $('#eyesI').toggleClass('am-icon-toggle-off');
    $('#eyesI').toggleClass('am-icon-toggle-on');
    //主题切换
    $('body').toggleClass('theme-white');
    $('body').toggleClass('theme-black');
    //保存到浏览器缓存 这个暂时不需要 先注着
    saveSelectColor.Color = $('body').attr('class');
    storageSave(saveSelectColor);
}
//退出登录
function exit() {
    sessionStorage.clear();
    window.location.href = '/login';
}
//左边栏的隐藏和出现
function leftSidebar() {
    if ($('.left-sidebar').attr('class').indexOf('active') > 0
        && $('.tpl-content-wrapper').attr('class').indexOf('active') > 0) {
        $('.left-sidebar').addClass('active');
        $('.tpl-content-wrapper').addClass('active');
    } else {
        $('.left-sidebar').removeClass('active');
        $('.tpl-content-wrapper').removeClass('active');
    }
}

/**
 * 只传一个参数 ，标题不传就用默认标题，需要自定义标题就传入2个参数
 * @param text  内容
 * @param title 标题
 */
function showAlert(text,title) {
    if(title == null || title == '' || title == undefined){
        title = '系统提示';
    }
    $("#alertTitle").html(title);
    $("#alertText").html(text);
    $("#showAlertID").modal();
}

/**
 * 传入只一个参数就是内容 如果传了2个参数那 第二个就是标题
 * 以此类推 第三个是取消的按钮显示的字 第四个是确认按钮显示的字
 * @param text  内容
 * @param title 标题
 * @param cancel    取消
 * @param ok    确认
 * @return 直接返回div的对象，可以连着点modal启用
 *
 * 栗子
showConfirm('测试','你好','算了','滚蛋').modal({
     onConfirm: function() {
         //干点啥
     },
    onCancel: function() {
         //干点啥
    }
});
 */
function  showConfirm(text,title,cancel,ok) {
    if(title == null || title == '' || title == undefined){
        title = '系统提示';
    }
    if(cancel == null || cancel == '' || cancel == undefined){
        cancel = '取消';
    }
    if(ok == null || ok == '' || ok == undefined){
        ok = '确定';
    }
    $("#confirmTitle").html(title);
    $("#confirmText").html(text);
    $('#confirmCancel').text(cancel);
    $('#confirmOK').text(ok);
    return $('#showConfirmID');
}