var vm = new Vue({
    el: '#message',
    data: {
        userList: [],
    },
    methods: {
        getAllUser: getAllUser
    },
    created: getInit()

})

function getInit() {
    getAllUser();
}

//查询员工
function getAllUser() {
    $.ajax({
        type: "POST",
        url: "/projectoa/message/getAllUser",
        dataType: "json",
        success: function (result) {
            //返回的是所有的用户的ID realname和部门名称
            vm.userList = result.value;
            //初始化 收件人 下拉列表
            initReceives();
        }
    })
}

/**
 * 这里用的是一个带搜索框 带分组的下拉列表 可以多选 内容会根据sql取到的内容 动态加载
 * 分组按照部门名称
 * 这里用code先记录代码，后面一起append，是因为先append不带结束标签的内容，html会自作聪明加结束标签导致异常
 * 大致上的思路就是和斐波那契数列判断逻辑类似
 * 用一个temp记录上一条部门叫什么
 * 如果temp里面是空的说明是第一次循环  直接给初始值
 * 如果temp里面内容和上一次一样的      说明上条和本条同部门 直接过
 * 如果temp里面内容和上一次不一样      说明循环到新的部门了 加结束标签 加新的开始标签
 *
 * 中间无论如何都无脑加option
 *
 * 最后一次循环加上结束标签
 *
 * 出来的结果就是
 * <optgroup 部门1>
 *      <参数1/>
 *      <参数2/>
 *      <参数3/>
 * </optgroup>
 * <optgroup 部门2>
 *      <参数1/>
 * </optgroup>
 * 以此类推。。。
 */
function initReceives() {
    //需要把数据按照一定规律装载进select
    var tempdepartment = "";
    var code = "";
    for (var i = 0; i < vm.userList.length; i++) {
        var id = vm.userList[i].id;
        var realname = vm.userList[i].realname;
        var department = vm.userList[i].department;
        //如果tempdepartment == "" 说明第一次执行 不用判断直接给department
        if (tempdepartment == "") {
            tempdepartment = department;
            code += '<optgroup label=' + department + '>';
        } else if (tempdepartment != department) {
            //不是第一次执行，要判断的是上一条的部门和这条是否一样 不一样才重新开一组
            tempdepartment = department;
            code += '</optgroup><optgroup label=' + department + '>';
        }
        //动态装载用户
        code += '<option value=' + id + '>' + realname + '</option>';
        if (i == vm.userList.length - 1) {
            code += '</optgroup>';
        }
    }
    $('#receives').append(code)
}

function sendMessage() {
    var selected = $('#receives').val();
    var title = $('#messageTitle').val();
    var message = $('#messageMain').val();


}