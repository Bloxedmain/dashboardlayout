/**
 * Created by sailengsi on 2017/4/30.
 */

/**
 * 用户模块
 * @type {Object}
 */
export default [
    {
        name  : '登录',
        method: 'login',
        path  : '/pass/sso/login',
        type  : 'post',
    },{
        name  : '验证是否登陆',
        method: 'verify',
        path  : '/pass/sso/verify',
        type  : 'get'
    },{
        name  : '验证session',
        method: 'session',
        path  : '/pass/sso/session',
        type  : 'get'
    },{
        name  :'退出登录',
        method:'loginOut',
        path  :'/pass/sso/logout',
        type  :'post'
    },
    {
        name  : '获取用户列表',
        method: 'selectUser',
        path  : '/User/selectUser',
        type  : 'get',
    },
    {
        name  : '添加修改用户公用接口',
        method: 'saveUser',
        path  : '/User/saveUser',
        type  : 'post',
    },
    {
        name  : '删除用户',
        method: 'deleteUser',
        path  : '/User/deleteUser',
        type  : 'post',
    },
    {
        name  : '获取用户信息',
        method: 'findUser',
        path  : '/User/findUser',
        type  : 'get',
    },

    {
        name  : '修改密码',
        method: 'updatePass',
        path  : '/User/updatePass',
        type  : 'post',
    },
    {
        name  : '设置权限',
        method: 'updateUserAccess',
        path  : '/User/updateUserAccess',
        type  : 'post',
    },
    {
        name  : '设置用户状态',
        method: 'updateUserStatus',
        path  : '/User/updateUserStatus',
        type  : 'post',
    },
    {
        name  : '查找用户组',
        method: 'getUserGroup',
        path  : '/org/usergroup/list',
        type  : 'post',
    }
   
];