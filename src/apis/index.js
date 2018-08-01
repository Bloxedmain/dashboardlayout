/**
 * 导出所有模块需要用到接口
 * 一级属性：模块名
 * 一级属性中的方法：当前模块需要用的接口
 * @type {Object}
 */

import user from './user/';
import loginUnit from './loginUnit/';
import system from './system/';
import userManage from './userManage/';
import unitManage from './unitManage/';
import dashBoard from "./dashBoard/";
//import organization from './organization';
export default [{
    module:'user',
    name:'用户管理',
    list:user
},{
    module:'loginUnit',
    name:'登录机构',
    list:loginUnit
},{
    module:'system',
    name:'系统设置',
    list:system
},{
    module:'userManage',
    name:'用户管理',
    list:userManage
},{
    module:'unitManage',
    name:'机构管理',
    list:unitManage
},{
    module:'dashBoard',
    name:'dashBoard',
    list:dashBoard
}];